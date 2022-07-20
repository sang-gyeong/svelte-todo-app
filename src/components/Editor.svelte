<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let content = '';
  export let id = '';
  export let listColor = '#f3bc1a';

  const dispatch = createEventDispatcher();

  function addEventHandler() {
    const trimmedContent = content.trim();
    if (!trimmedContent.length) {
      alert('내용을 최소 한글자 이상 입력해주세요');
      return;
    }

    dispatch('addEvent', { content, listColor });
    offEditMode();
  }

  function editEventHandler() {
    dispatch('editEvent', { content, color: listColor });
    offEditMode();
  }

  function colorChangeHandler(event: Event) {
    console.log('hey');
    const color = (event.target as HTMLInputElement).value;
    listColor = color;
    console.log('color : ', color);

    dispatch('changeColor', { color });
  }

  function offEditMode() {
    dispatch('offEditMode');
    content = '';
  }
</script>

<textarea
  bind:value={content}
  placeholder="내용을 입력하세요"
  on:keydown={e =>
    e.key === 'Enter' && (id ? editEventHandler() : addEventHandler())}
  on:keydown={e => e.key === 'Escape' && offEditMode()}
/>
<div class="button-wrapper">
  <label>
    🎨
    <input type="color" bind:value={listColor} on:change={colorChangeHandler} />
  </label>
  {#if id}
    <button type="button" class="edit-button" on:click={editEventHandler}
      >EDIT</button
    >
  {:else}
    <button type="button" class="edit-button" on:click={addEventHandler}
      >ADD</button
    >
  {/if}
  <button type="button" class="delete-button" on:click={offEditMode}
    >Cancel</button
  >
</div>

<style>
  input[type='color'] {
    width: 0px;
    height: 0px;
    visibility: hidden;
    padding: 0;
    margin: 0;
  }

  label {
    font-size: 32px;
    cursor: pointer;
  }

  textarea {
    width: 100%;
    height: 80px;
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
  }

  .button-wrapper {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    height: 30px;
    font-family: 'Vitro_core';
  }

  .edit-button,
  .delete-button {
    width: 80px;
    height: 30px;
    font-size: 14px;
    border: none;
  }

  .edit-button {
    background-color: greenyellow;
  }

  .delete-button {
    background-color: tomato;
    color: white;
  }
</style>
