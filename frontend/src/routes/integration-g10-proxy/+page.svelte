<script>
    import { onMount } from 'svelte';
    import Header from "../Header.svelte";
    /**
     * @type {any[]}
     */
    let datos = [];
  
    onMount(async () => {
      get_data();
    });
    async function get_data() {
      const response = await fetch('/api/v2/economy-stats');
      if (response.ok) {
        try {
          const dataReceived = await response.json();
          datos = dataReceived;
          
        } catch (error) {
          console.log(`Error parsing the result: ${error}`);
        }
      }
    }
  </script>
  
  <main>
   
    <div class="container">
      <h2 class="text-center">Integración de los datos del Grupo 10 (Estadísticas de Economía)</h2>
      <table class="table">
        <thead class="table-dark">
            <tr>
            <th>Periodo</th>
            <th>Territorio</th>
            <th>Casas Finalizadas</th>
            <th>Precio medio metro cuadrado</th>
            <th>Turistas</th>
          </tr>
        </thead>
        <tbody>
          {#each datos as item, i}
          <tr class:even="{i % 2 === 0}" class:odd="{i % 2 !== 0}">
            <td>{item.period}</td>
            <td>{item.territory}</td>
            <td>{item.finished_house}</td>
            <td>{item.half_price_m_two}</td>
            <td>{item.tourist}</td>
          </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </main>
  
  <style>
    main {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #f8f9fa;
    }
  
    .even {
      background-color: #f2f2f2;
    }
  
    .odd {
      background-color: #eaeaea;
    }
  </style>
  