<script lang="ts">
  import List from './List.svelte';
  import ListCreater from './ListCreater.svelte';
  import { lists } from '../store/lists.js';

  let currentValue: any = '';

  lists.subscribe(value => {
    currentValue = value;
  });
</script>

<div class="list-container">
  {#each currentValue as list}
    <List title={list.title} listId={list.id} />
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
