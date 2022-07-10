<script lang="ts">
  import { lists } from '../store/lists';
  import { getColorByBgColor } from '../utils';
  import Editor from './Editor.svelte';
  import * as listService from '../api/list';

  export let listId = '';
  export let title = '';
  export let listColor = '';

  let isEditMode = false;
  let dragging = false;
  let listEl: HTMLElement;

  const deleteList = () => {
    if (
      window.confirm(
        '리스트를 포함한 카드 내용 전체가 삭제됩니다.\n정말 삭제하시겠습니까?'
      )
    ) {
      listService.deleteList(listId).then(() => {
        lists.delete(listId);
      });
    }
  };

  const changeColorHandler = e => {
    const changedColor = e.detail.color;

    listEl.style.backgroundColor = changedColor;
  };

  const offEditMode = () => {
    isEditMode = false;

    listEl.style.backgroundColor = listColor;
  };
</script>

<div
  class="list draggable"
  style="background-color: {listColor}"
  draggable="true"
  class:dragging
  on:dragstart={() => (dragging = true)}
  on:dragend={() => (dragging = false)}
  bind:this={listEl}
>
  {#if isEditMode}
    <Editor
      {listColor}
      {listId}
      {title}
      on:changeColor={changeColorHandler}
      on:offEditMode={offEditMode}
    />
  {:else}
    <p class="title" style="color: {getColorByBgColor(listColor)}">
      {title}
    </p>
    <div class="button-wrapper">
      <button
        type="button"
        class="edit-button"
        on:click={() => (isEditMode = true)}>Edit</button
      >
      <button type="button" class="delete-button" on:click={deleteList}
        >DELETE</button
      >
    </div>
  {/if}
</div>

<style>
  .title {
    cursor: move;
  }

  .button-wrapper {
    display: none;
  }

  .list {
    white-space: pre-wrap;
    width: 320px;
    height: 800px;
    border-radius: 20px;
    border: 1px solid black;
    background-color: #f3bc1a;
    padding: 28px;
    box-shadow: 6px 6px 0 black;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y: scroll;
    font-size: 20px;
  }

  .list:hover .button-wrapper {
    display: inline;
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
