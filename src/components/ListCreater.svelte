<script lang="ts">
  import { lists } from '../store/lists.js';

  const createList = () => {
    lists.update(n => [...n, { title: value }]);
    writable = false;
  };

  let writable = true;
  let value = '';

  const offEditMode = () => {
    writable = false;
  };
</script>

{#if writable}
  <div class="create-list">
    <textarea bind:value></textarea>
    <button type="button" on:click="{createList}">추가</button>
    <button type="button" on:click="{offEditMode}">Cancel</button>
  </div>
{:else}
  <button
    class="create-list-button"
    type="button"
    on:click="{() => (writable = true)}">NEW</button
  >
{/if}

<style>
  .create-list {
    width: 320px;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 15px;
  }

  .create-list-button {
    width: 320px;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 15px;
  }
</style>
