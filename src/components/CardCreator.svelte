<script lang="ts">
  import { lists } from '../store/lists';
  import { createRandom } from '../utils';
  import Editor from './Editor.svelte';
  import * as listService from '../api/list';

  export let listId = '';
  let isEditMode = false;

  function addEventHandler(e: CustomEvent) {
    const id = createRandom();
    const { content } = e.detail;

    listService
      .addCardItem({ listId, content })
      .then(({ data: { listId, cardId, pos } }) => {
        lists.addCard(listId, { id: cardId, content, pos });
      });
  }
</script>

<div class="create-card-wrapper">
  {#if isEditMode}
    <div>
      <Editor
        on:offEditMode={() => (isEditMode = false)}
        on:addEvent={addEventHandler}
      />
    </div>
  {:else}
    <div class="create-card" on:click={() => (isEditMode = true)}>
      + create new card
    </div>
  {/if}
</div>

<style>
  .create-card-wrapper {
    font-size: 16px;
    font-family: 'CBNUJIKJI';
    color: black;
  }

  .create-card {
    width: 100%;
    height: fit-content;
    background-color: white;
    padding: 12px;
    border-radius: 4px;
    box-shadow: 0.5px 2px 0 black;
    line-height: 130%;
    opacity: 50%;
    cursor: pointer;
  }

  .create-card:hover {
    opacity: 95%;
  }
</style>
