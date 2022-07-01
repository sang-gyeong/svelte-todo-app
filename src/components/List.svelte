<script lang="ts">
  import { lists } from '../store/lists';
  export let listId = 0;
  export let title = '';

  let showEditButton = false;

  const deleteList = () => {
    if (
      window.confirm(
        '리스트를 포함한 카드 내용 전체가 삭제됩니다.\n정말 삭제하시겠습니까?'
      )
    ) {
      lists.delete(listId);
    }
  };
</script>

<div
  class="list"
  on:mouseleave={() => (showEditButton = false)}
  on:mouseover={() => (showEditButton = true)}
  on:focus={() => (showEditButton = true)}
>
  <p class="title">{title}</p>

  {#if showEditButton}
    <span>
      <button type="button" class="edit-button">Edit</button>
      <button type="button" class="delete-button" on:click={deleteList}
        >DELETE</button
      >
    </span>
  {/if}
</div>

<style>
  .title {
    cursor: pointer;
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
    font-family: 'Vitro_core';
    font-size: 20px;
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
