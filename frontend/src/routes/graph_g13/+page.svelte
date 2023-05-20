<script>
    import { onMount } from 'svelte';
    import { Table } from 'sveltestrap';
    import Header from "../Header.svelte";
    /**
     * @type {any[]}
     */
    let dataLocalEntities = [];
  
    onMount(async () => {
      getData();
    });
  //PROXY
    async function getData() {
      const response = await fetch('/api/v2/localentities');
      if (response.ok) {
        try {
          const dataReceived = await response.json();
          dataLocalEntities = dataReceived;
          
        } catch (error) {
          console.log(`Error parsing the result: ${error}`);
        }
      }
    }
  </script>
  
  <main>
    <Header></Header>
    <div class="container">
      <h1 class="text-center">Uso API compañero SOS - G13</h1>
      <Table class="table table-hover">
        <thead>
          <tr>
            <th>Provincia</th>
            <th>Teléfono</th>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Fecha Nombramiento Presidente</th>
            <th>Extensión</th>
            <th>Población</th>
            <th>Gastos</th>
            <th>Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {#each dataLocalEntities as datos, i}
          <tr class:even="{i % 2 === 0}" class:odd="{i % 2 !== 0}">
            <td>{datos.province}</td>
            <td>{datos.landline}</td>
            <td>{datos.first_name}</td>
            <td>{datos.second_name}</td>
            <td>{datos.president_appointment_date}</td>
            <td>{datos.surface_extension}</td>
            <td>{datos.population}</td>
            <td>{datos.expense}</td>
            <td>{datos.income}</td>
          </tr>
          {/each}
        </tbody>
      </Table>
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
  