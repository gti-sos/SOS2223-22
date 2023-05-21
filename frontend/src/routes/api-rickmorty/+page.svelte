<script>
    // @ts-nocheck
  
    import { onMount } from 'svelte';
  
    let characters = [];
    let searchQuery = '';
    let selectedCharacter = null;
  
    const buscarPersonajes = async () => {
  try {
    let page = 1;
    let allCharacters = [];

    while (true) {
      const response = await fetch(`https://rickandmortyapi.com/api/character?name=${searchQuery}&page=${page}`);
      const data = await response.json();
      const { results, info } = data;

      allCharacters = [...allCharacters, ...results];

      if (info.next) {
        page++;
      } else {
        break;
      }
    }

    characters = allCharacters;
  } catch (error) {
    console.error('Error al obtener datos de la API de Rick and Morty:', error);
  }
};

  
    const buscar = () => {
      buscarPersonajes();
    };
  
    const seleccionarPersonaje = (event) => {
      selectedCharacter = event.target.value;
    };
  
    const obtenerDetalles = async () => {
      if (selectedCharacter) {
        const response = await fetch(selectedCharacter);
        const data = await response.json();
        console.log(data);
      }
    };
  
    onMount(() => {
      buscarPersonajes();
    });
  </script>
  
  <main>
    <h1 class="text-danger">Personajes de Rick and Morty</h1>
  
    <div class="search-container">
      <input type="text" bind:value="{searchQuery}" on:keydown="{event => event.key === 'Enter' && buscar()}" placeholder="Buscar por nombre" list="character-list">
      <datalist id="character-list">
        {#each characters as character}
          <option value="{character.name}"></option>
        {/each}
      </datalist>
      <button class="btn btn-warning" on:click="{buscar}">Buscar</button>
    </div>
  
    {#if characters.length > 0}
      <div class="character-grid">
        {#each characters as character}
          <div class="character-card">
            <img src="{character.image}" alt="{character.name}">
            <h3>{character.name}</h3>
            <p>{character.species}</p>
            <p>{character.status}</p>
          </div>
        {/each}
      </div>
    {:else if searchQuery !== ''}
      <p>No se encontraron personajes con ese nombre.</p>
    {:else}
      <p>Ingresa un nombre para buscar personajes.</p>
    {/if}
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 20px;
    }
  
    h1 {
      margin-bottom: 20px;
    }
  
    .search-container {
      margin-bottom: 20px;
    }
  
    .search-container input {
      padding: 5px;
      margin-right: 10px;
    }
  
    .character-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  
    .character-card {
      width: 200px;
      margin: 10px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      text-align: center;
    }
  
    .character-card img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: 5px;
      margin-bottom: 10px;
    }
  </style>
  