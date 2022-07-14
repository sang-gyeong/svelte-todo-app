<script lang="ts">
  import Editor from './Editor.svelte';
  import { lists } from '../store/lists';

  export let listId = '';
  export let cardId = '';
  export let content = '';

  let isEditMode = false;

  function editCard(e: CustomEvent) {
    const { content } = e.detail;

    lists.editCard(listId, cardId, content);
  }
</script>

{#if isEditMode}
  <Editor
    id={cardId}
    {content}
    on:offEditMode={() => (isEditMode = false)}
    on:editEvent={editCard}
  />
{:else}
  <div class="card-item">
    {content}
    <span
      class="material-symbols-rounded icon"
      on:click={() => (isEditMode = true)}
    >
      edit
    </span>
  </div>
{/if}

<style>
  .card-item {
    width: 100%;
    height: fit-content;
    background-color: white;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0.5px 2px 0 black;
    font-size: 16px;
    font-family: 'CBNUJIKJI';
    line-height: 130%;
    color: black;
    opacity: 95%;
    position: relative;
  }

  .card-item:hover .icon {
    display: block;
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
    position: absolute;
    right: 8px;
    top: 8px;
    display: none;
    cursor: pointer;
  }
</style>
