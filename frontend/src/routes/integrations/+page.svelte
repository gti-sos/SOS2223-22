<script>
    import { onMount } from 'svelte';
    import Header from "../Header.svelte";
  
    let urls = [
      {
        label: 'HighCharts',
        url: 'https://sos2223-22.appspot.com/graph_highchart'
      },
      {
        label: 'Charjs',
        url: 'https://sos2223-22.appspot.com/graph_chartjs'
      },
      {
        label: 'Api Gatos',
        url: 'https://sos2223-22.appspot.com/use_randomCat'
      },
      {
        label: 'Api Pokemon',
        url: 'https://sos2223-22.appspot.com/graph_pokemon'
      },
      {
        label: 'Music Playlist(Oauth)',
        url: 'https://sos2223-22.appspot.com/twitch_api'
      },
      {
        label: 'Uso Api Compañero SOS + Proxy',
        url: 'https://sos2223-22.appspot.com/graph_g13'
      },
      {
        label: 'Api Baloncesto',
        url: 'https://sos2223-22.appspot.com/graph_basket'
      },
      {
        label: 'OpenAI',
        url: 'https://www.openai.com'
      }
    ];
  
    /**
     * @param {string | URL | undefined} url
     */
    function openUrl(url) {
      window.open(url, '_blank');
    }
  </script>
  
  <main>
    <Header></Header>
    <div class="columns">
      <div class="column">
        <h2 class="column-title">APIS Antonio Carranza</h2>
        <ul class="links-list">
          {#each urls.slice(0, 7) as { label, url }}
            <li class="link-item" on:click="{() => openUrl(url)}">
              <span class="link-label">{label}</span>
              <span class="link-icon">➡️</span>
            </li>
          {/each}
        </ul>
      </div>
      <div class="column">
        <h2 class="column-title">Columna 2</h2>
        <ul class="links-list">
          {#each urls.slice(7) as { label, url }}
            <li class="link-item" on:click="{() => openUrl(url)}">
              <span class="link-label">{label}</span>
              <span class="link-icon">➡️</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    .columns {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
  
    .column {
      flex-grow: 1;
    }
  
    .column-title {
      text-align: center;
      margin-bottom: 1rem;
    }
  
    .links-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
  
    .link-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      background-color: #f2f2f2;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
      transition: background-color 0.2s ease;
    }
  
    .link-item:hover {
      background-color: #e0e0e0;
    }
  
    .link-label {
      flex-grow: 1;
      font-size: 1.2rem;
    }
  
    .link-icon {
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  </style>
  