<script lang="ts">
  import ListCreater from './ListCreater.svelte';
  import List from './List.svelte';
  import { lists } from '../store/lists';
</script>

<div class="list-container">
  {#each $lists as { id: listId, title, color: listColor } (listId)}
    <List {listId} {title} {listColor} />
  {/each}
  <ListCreater />
</div>

<style>
  .list-container {
    width: 100%;
    min-height: calc(100% - 50px);
    display: flex;
    gap: 50px;
  }
</style>
