<script lang="ts">
  import ListContainer from './components/ListContainer.svelte';
  import { user } from './store/user';
</script>

<header>
  <span>🌲 SVELTE TODO APP 🌲</span>
  <div class="profile">
    {#if $user?.nickname?.length}
      <span>{$user.nickname}</span>
      <img class="profile-image" alt="profile-image" src={$user.profileURL} />
    {:else}
      <button
        on:click={() =>
          (window.location.href = `http://175.45.194.105:3000/api/auth/login`)}
        >login</button
      >
    {/if}
  </div>
</header>

<main>
  <ListContainer />

  <!-- <button type="button" class="floating-delete-button"
    ><span class="material-symbols-outlined"> delete </span></button
  > -->
</main>

<style>
  header {
    width: 100%;
    height: 60px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px 0 50px;
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

  /* .floating-delete-button {
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
  } */

  .profile {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
</style>
