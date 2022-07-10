<script lang="ts">
  import ListContainer from './components/ListContainer.svelte';
</script>

<header>🌲 SVELTE TODO APP 🌲</header>
<main>
  <ListContainer />
</main>

<style>
  header {
    width: 100%;
    height: 60px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    padding: 0 28px;
    font-family: 'Vitro_core';
  }

  main {
    width: 100vw;
    background-color: #0069dc;
    height: 100vh;
    padding: 50px;
    box-sizing: border-box;
    font-family: 'Vitro_core';
    overflow: scroll;
  }
</style>
