<script lang="ts">
  import { lists } from '../store/lists.js';
  import { createRandom } from '../utils.js';

  const addList = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle.length) {
      return;
    }

    const randomId = createRandom();
    lists.add({ id: randomId, title });
    offEditMode();
  };

  let writable = true;
  let title = '';

  const offEditMode = () => {
    writable = false;
    title = '';
  };

  const onEditMode = () => {
    writable = true;
  };
</script>

{#if writable}
  <div class="create-list">
    <textarea bind:value={title} placeholder="타이틀을 입력하세요" />
    <button type="button" on:click={addList}>추가</button>
    <button type="button" on:click={offEditMode}>Cancel</button>
  </div>
{:else}
  <button class="create-list-button" type="button" on:click={onEditMode}
    >+</button
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
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #f3bc1a;
    display: flex;
    align-items: center;
    border: 1px solid black;
    box-shadow: 6px 6px 0 black;
    font-family: 'Vitro_core';
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
