<script lang="ts">
  import ListContainer from './components/ListContainer.svelte';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"
  />
</svelte:head>

<header>SVELTE TODO APP</header>
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
    padding: 20px;
  }

  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    width: fit-content;
    margin: 0;
    padding: 0;
    overflow-x: scroll;
    overflow-y: scroll;
  }

  main {
    width: 100vw;
    background-color: #0069dc;
    height: 100vh;
    padding: 50px;
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Vitro_core';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Vitro_core.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: '양진체';
    src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'CBNUJIKJI';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/CBNUJIKJI.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
</style>
