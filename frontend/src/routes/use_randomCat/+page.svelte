<script>
  import { onMount } from 'svelte';
  import Header from "../Header.svelte";

  let imageUrl = '';

  async function fetchCatImage() {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      imageUrl = data[0].url;
    } catch (error) {
      console.error(error);
    }
  }

  onMount(fetchCatImage);

  function reloadCatImage() {
    imageUrl = '';
    fetchCatImage();
  }
</script>

<main>
  <Header></Header>
  <h1>Random Cats</h1>
  <div class="cat-image-container">
    {#if imageUrl}
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src="{imageUrl}" alt="Cat Image" class="cat-image" />
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
  <button on:click="{reloadCatImage}">Actualizar</button>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .cat-image-container {
    margin-bottom: 2rem;
  }

  .cat-image {
    max-width: 400px;
    max-height: 300px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
