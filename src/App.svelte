<script lang="ts">
  import ListContainer from './components/ListContainer.svelte';

  let timer = false;
  function handler(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    setTimeout(() => {
      timer = true;
    }, 3000);
  }

  function dragend(e) {
    console.log('drop!');
    timer = false;
  }
</script>

<header>🌲 SVELTE TODO APP 🌲</header>
<svelte:window on:drop={dragend} />
<main>
  <ListContainer />
  {#if timer}
    <button type="button" class="floating-delete-button"
      ><span class="material-symbols-outlined"> delete </span></button
    >
  {/if}
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
    position: relative;
  }

  .floating-delete-button {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 30%;
    width: 80px;
    height: 80px;
    margin: 0px auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: tomato;
    border: 2px solid white;
    font-size: 60px;
  }
</style>
