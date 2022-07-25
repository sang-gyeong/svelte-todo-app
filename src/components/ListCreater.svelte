<script lang="ts">
  import * as listService from '../api/list';
  import Editor from './Editor.svelte';
  import { lists } from '../store/lists';

  let isEditMode = false;
  let listColor = '#f3bc1a';
  let createListEL: HTMLElement;
  let dragEnter = false;

  function changeColorHandler(e: CustomEvent) {
    const changedColor = e.detail.color;

    listColor = changedColor;
    createListEL.style.backgroundColor = changedColor;
  }

  function addEventHandler(e: CustomEvent) {
    const { content } = e.detail;

    listService
      .addListItem({ title: content, color: listColor })
      .then(({ data: { listId, pos } }) => {
        console.log('*', pos);
        lists.add({ id: listId, title: content, color: listColor, pos });
      });
  }
</script>

{#if isEditMode}
  <div
    class="create-list"
    style="background-color: {listColor}"
    bind:this={createListEL}
  >
    <Editor
      {listColor}
      on:changeColor={changeColorHandler}
      on:offEditMode={() => (isEditMode = false)}
      on:addEvent={addEventHandler}
    />
  </div>
{:else}
  <button
    class="create-list-button"
    type="button"
    class:drag-enter={dragEnter}
    on:click={() => (isEditMode = true)}
    on:dragenter={() => (dragEnter = true)}
    on:dragleave={() => (dragEnter = false)}
    style="background-color: {listColor}">+</button
  >
{/if}

<style>
  .create-list {
    width: 320px;
    height: fit-content;
    padding: 18px 20px;
    border-radius: 20px;
    border: 1px solid black;
    box-shadow: 6px 6px 0 black;
  }

  .create-list-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    border: 1px solid black;
    box-shadow: 6px 6px 0 black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .create-list-button.drag-enter {
    border: 100px solid white;
  }
</style>
