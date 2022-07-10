<script lang="ts">
  import ListCreater from './ListCreater.svelte';
  import List from './List.svelte';
  import { lists } from '../store/lists';
  import { dragAndDrop } from '../actions/dragAndDrop';
  import { onMount } from 'svelte';
  import * as listService from '../api/list';

  onMount(() => {
    listService.loadLists().then(({ data }) => {
      lists.init(data);
    });
  });
</script>

<div class="wrapper">
  {#if $lists.length}
    <div class="list-container" use:dragAndDrop>
      {#each $lists as { id: listId, title, color: listColor } (listId)}
        <List {listId} {title} {listColor} />
      {/each}
    </div>
  {/if}
  <ListCreater />
</div>

<style>
  .wrapper {
    width: fit-content;
    min-height: calc(100% - 50px);
    display: flex;
    gap: 50px;
  }

  .list-container {
    display: flex;
    gap: 50px;
  }
</style>
