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
  <List />
  <List />
  {#each currentValue as list}
    <List title="{list.title}" />
  {/each}
  <ListCreater />
</div>

<style>
  .list-container {
    border: 1px solid gray;
    width: 100%;
    min-height: calc(100% - 50px);
    display: flex;
    gap: 50px;
  }
</style>
