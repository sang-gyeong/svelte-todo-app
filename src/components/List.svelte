<script lang="ts">
  export let title = '';

  let showEditButton = false;
</script>

<div
  class="list"
  on:mouseleave="{() => (showEditButton = false)}"
  on:mouseover="{() => (showEditButton = true)}"
  on:focus="{() => (showEditButton = true)}"
>
  {title}

  {#if showEditButton}
    <span>
      <button type="button" class="edit-button">Edit</button>
      <button type="button" class="delete-button">DELETE</button>
    </span>
  {/if}
</div>

<style>
  .list {
    width: 320px;
    height: 800px;
    border-radius: 20px;
    border: 1px solid black;
    background-color: #f3bc1a;
    padding: 20px;
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
