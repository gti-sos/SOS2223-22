<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { Chart } from 'chart.js/auto';

  let datos_cgm = [];
  let jobs = [];

  async function getJobs() {
    const res = await fetch('https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats', {
      method: 'GET'
    });

    if (res.ok) {
      jobs = await res.json();
    } else {
      console.error('Error loading jobs data');
    }
  }

  async function load_data() {
    const res = await fetch('https://sos2223-22.appspot.com/api/v2/ict-promotion-strategy-stats/', {
      method: 'GET'
    });

    try {
      const data = await res.json();
      datos_cgm = data;
    } catch (error) {
      console.log(`Error parsing results: ${error}`);
    }
  }

  async function fetchData() {
    await load_data();
    await getJobs();

    // Filtrar solo el territorio "España" en los datos de jobs
    var jobsFiltered = jobs.filter(item => item.territory === "españa");

    // Extraer los años únicos y ordenarlos de mayor a menor
    var years = Array.from(new Set(jobsFiltered.map(item => item.year))).sort((a, b) => b - a);

    // Crear un objeto de mapeo para los datos de jobs por año
    var jobsDataMap = {};
    jobsFiltered.forEach(item => {
      jobsDataMap[item.year] = {
        jobsIndustry: item.jobs_industry
      };
    });

    // Alinear los datos de datos_cgm con los años y el territorio "España"
    var datosCgmAligned = datos_cgm.filter(item => item.territory === "spain" && years.includes(item.year));
    datosCgmAligned.forEach(item => {
      jobsDataMap[item.year].ictManufacturingIndustry = item.ict_manufacturing_industry;
    });

    // Extraer los valores alineados de jobs_industry e ict_manufacturing_industry
    var jobsIndustryValues = years.map(year => jobsDataMap[year].jobsIndustry);
    var ictManufacturingValues = years.map(year => jobsDataMap[year].ictManufacturingIndustry);

    // Configuración del gráfico
    var chartConfig = {
      type: 'bar',
      data: {
        labels: years.map(String), // Convertir los años a cadenas
        datasets: [
          {
            label: 'Trabajos en la industria',
            data: jobsIndustryValues,
            backgroundColor: 'rgba(0, 123, 255, 0.5)', // Color de fondo de las barras
            borderColor: 'rgba(0, 123, 255, 1)', // Color del borde de las barras
            borderWidth: 1 // Ancho del borde de las barras
          },
          {
            label: 'Industria manufacturera de TIC',
            data: ictManufacturingValues,
            backgroundColor: 'rgba(255, 0, 0, 0.5)', // Color de fondo de las barras para la industria manufacturera de TIC
            borderColor: 'rgba(255, 0, 0, 1)', // Color del borde de las barras para la industria manufacturera de TIC
            borderWidth: 1 // Ancho del borde de las barras para la industria manufacturera de TIC
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category', // Utilizar la escala 'category' para el eje x
            reverse: true // Ordenar de mayor a menor
          },
          y: {
            stacked: true // Mostrar las barras apiladas verticalmente
          }
        }
      }
    };

    // Crear el gráfico
    var ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, chartConfig);
  }

  onMount(fetchData);
</script>

<main>
  <br><br>
  <canvas id="myChart"></canvas>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px); /* ajusta según tus necesidades */
  }
</style>
