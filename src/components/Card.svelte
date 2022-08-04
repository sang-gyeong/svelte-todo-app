<script lang="ts">
  import Editor from './Editor.svelte';

  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { cards } from '../store/cards';

  export let cardId = '';
  export let content = '';

  let isEditMode = false;
  let dragging = false;

  function editCard(e: CustomEvent) {
    const { content } = e.detail;

    cards.edit(cardId, content);
  }

  function clickDelete() {
    deleteCard(cardId);
  }

  function drop(e: DragEvent) {
    const cardId = e.dataTransfer.getData('CARD');

    deleteCard(cardId);
  }

  function deleteCard(cardId: string) {
    // if (window.confirm('카드가 삭제됩니다.\n정말 삭제하시겠습니까?')) {
    //   cards.delete(cardId);
    // }

    cards.delete(cardId);
  }

  function dragStart(e: DragEvent) {
    dragging = true;
    e.dataTransfer.setData('CARD', cardId);
  }
</script>

<svelte:window on:drop={drop} on:dragover|preventDefault />

<div class="card-wrapper">
  {#if isEditMode}
    <Editor
      id={cardId}
      {content}
      on:offEditMode={() => (isEditMode = false)}
      on:editEvent={editCard}
    />
  {:else}
    <div
      data-id={cardId}
      class="card draggable"
      draggable="true"
      class:dragging
      on:dragstart|self={dragStart}
      on:dragend={() => (dragging = false)}
    >
      {content}
      <div class="icon-wrapper">
        <span
          class="material-symbols-rounded icon"
          on:click={() => (isEditMode = true)}
        >
          edit
        </span>
        <span class="material-symbols-rounded icon" on:click={clickDelete}>
          delete
        </span>
      </div>
    </div>
  {/if}
</div>

<style>
  .card-wrapper {
    font-size: 16px;
    font-family: 'CBNUJIKJI';
    line-height: 130%;
    color: black;
  }
  .card {
    width: 100%;
    height: fit-content;
    background-color: white;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0.5px 2px 0 black;
    opacity: 95%;
    position: relative;
  }

  .icon-wrapper {
    display: none;
    position: absolute;
    right: 8px;
    top: 8px;
    align-items: center;
  }

  .card:hover .icon-wrapper {
    display: flex;
  }

  .icon {
    background-color: white;
    opacity: 85%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>
