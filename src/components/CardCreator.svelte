<script lang="ts">
  import { lists } from '../store/lists';
  import { createRandom } from '../utils';
  import Editor from './Editor.svelte';

  export let listId = '';
  let isEditMode = false;

  function addEventHandler(e: CustomEvent) {
    const id = createRandom();
    const { content } = e.detail;

    lists.addCard(listId, { id, content });
  }
</script>

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

<style>
  .create-card {
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
    opacity: 50%;
    cursor: pointer;
  }

  .create-card:hover {
    opacity: 95%;
  }
</style>
