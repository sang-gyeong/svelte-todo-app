<script lang="ts">
  import { lists } from '../store/lists';
  import { createRandom } from '../utils';
  import { createEventDispatcher } from 'svelte';
  import * as listService from '../api/list';

  export let title = '';
  export let listId = '';
  export let listColor = '#f3bc1a';

  const dispatch = createEventDispatcher();

  function addList() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle.length) {
      alert('내용을 최소 한글자 이상 입력해주세요');
      return;
    }
    const id = createRandom();

    listService.addListItem({ id, title, color: listColor }).then(() => {
      listId = id;
      lists.add({ id, title, color: listColor });
      offEditMode();
    });
  }

  function offEditMode() {
    dispatch('offEditMode');
    title = '';
  }

  function editList() {
    listService.updateListItem({ listId, title, color: listColor }).then(() => {
      lists.edit(listId, title, listColor);
      offEditMode();
    });
  }

  function changeBgColor(event: Event) {
    const color = (event.target as HTMLInputElement).value;
    listColor = color;

    dispatch('changeColor', { color });
  }
</script>

<textarea
  bind:value={title}
  placeholder="타이틀을 입력하세요"
  on:keydown={e => e.key === 'Enter' && (listId ? editList() : addList())}
  on:keydown={e => e.key === 'Escape' && offEditMode()}
/>
<div class="button-wrapper">
  <label>
    🎨
    <input type="color" bind:value={listColor} on:change={changeBgColor} />
  </label>
  {#if listId}
    <button type="button" class="edit-button" on:click={editList}>EDIT</button>
  {:else}
    <button type="button" class="edit-button" on:click={addList}>ADD</button>
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
    background-color: rgba(255, 255, 255, 0.6);
    border: none;
  }

  .button-wrapper {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    height: 30px;
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
