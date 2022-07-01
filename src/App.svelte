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
    padding: 20px;
    font-family: 'Vitro_core';
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
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/vitro/VitroCore.woff2')
      format('woff2');
    font-display: fallback;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: '양진체';
    src: url('https://cdn.jsdelivr.net/gh/supernovice-lab/font@0.9/yangjin.woff')
      format('woff');
    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'CBNUJIKJI';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/CBNUJIKJI.woff')
      format('woff');
    font-display: swap;
    font-weight: normal;
    font-style: normal;
  }
</style>
