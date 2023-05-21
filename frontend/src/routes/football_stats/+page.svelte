<script>
  import { onMount } from 'svelte';

  /**
     * @type {string | any[]}
     */
  let competitions = [];

  onMount(async () => {
    try {
      const response = await fetch('https://api.football-data.org/v4/competitions', {
        headers: {
          'X-Auth-Token': '4afeee89525a4cec85aabd14c3a20698'
        }
      });
      if (response.ok) {
        const data = await response.json();
        competitions = data && data.competitions ? data.competitions : [];
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
</script>

<main>
  <h1>Competiciones de fútbol</h1>
  {#if competitions.length > 0}
    <ul>
      {#each competitions as competition}
        <li>
          <h2>{competition.name}</h2>
          <p>País: {competition.area.name}</p>
          {#if competition.emblem}
            <img src={competition.emblem} alt={competition.name} />
          {:else}
            <p>No hay emblema disponible</p>
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    padding: 20px;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
  }

  h2 {
    margin-top: 0;
  }

  img {
    max-width: 200px;
  }
</style>
