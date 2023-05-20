<script>
  import { onMount } from 'svelte';

  let quote = '';
  let character = '';
  let image = '';

  async function getRandomQuote() {
    const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes?lang=es');
    const data = await response.json();

    // Extraer la cita, el personaje y la imagen de los datos obtenidos
    quote = data[0].quote;
    character = data[0].character;
    image = data[0].image;
  }

  onMount(getRandomQuote);
</script>

<main>
  <h1>¡Cita de Los Simpson!</h1>
  <button class="btn btn-primary" on:click={getRandomQuote}>Obtener nueva cita</button>
  {#if quote && character && image}
    <p>"{quote}" - {character}</p>
    <img src={image} alt={character} />
  {:else}
    <p>Cargando...</p>
  {/if}
</main>
<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }

</style>