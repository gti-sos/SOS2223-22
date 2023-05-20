<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import Header from "../Header.svelte";
  
    let imageUrl = '';
  
    async function fetchRandomPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const results = response.data.results;
        const randomIndex = Math.floor(Math.random() * results.length);
        const randomPokemon = results[randomIndex];
        const pokemonResponse = await axios.get(randomPokemon.url);
        imageUrl = pokemonResponse.data.sprites.other['official-artwork'].front_default;
      } catch (error) {
        console.error(error);
      }
    }
  
    onMount(fetchRandomPokemon);
  
    function reloadPokemonImage() {
      imageUrl = '';
      fetchRandomPokemon();
    }
  </script>
  
  <main>
    <Header></Header>
    <h1>Random Pokémon</h1>
    <div class="pokemon-image-container">
      {#if imageUrl}
        <img src="{imageUrl}" alt="Pokémon Image" class="pokemon-image" />
      {:else}
        <p>Loading...</p>
      {/if}
    </div>
    <button on:click="{reloadPokemonImage}">Randomize</button>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    .pokemon-image-container {
      margin-bottom: 2rem;
    }
  
    .pokemon-image {
      max-width: 400px;
      max-height: 400px;
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
  