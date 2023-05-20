<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts/highstock';
  import Header from "../Header.svelte";

  // @ts-ignore
  let jobs = [];

  // @ts-ignore
  let limit = 10;
  // @ts-ignore
  let offset = 0;
  // @ts-ignore
  let territory = "";
  // @ts-ignore
  let year = "";
  // @ts-ignore
  let trabajos = "";
  // @ts-ignore
  let resources = [];
  // @ts-ignore
  let companias = "";
  // @ts-ignore
  let empleos = "";
  let resultStatus = "";
  let result = "";

  function calculateTotalResources() {
    let total = 0;

    for (let i = 0; i < jobs.length; i++) {
      // @ts-ignore
      total += jobs[i].resources.length;
    }

    return total;
  }

  // @ts-ignore
  let total = calculateTotalResources();

  async function getJobs() {
    resultStatus = result = '';

    const res = await fetch(`https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats`, {
      method: 'GET'
    });

    try {
      const data = await res.json();
      result = JSON.stringify(data, null, 2);
      jobs = data;

      if (res.ok) {
        const status = await res.status;
        resultStatus = status.toString();
        if (jobs.length === 0) {
          resultStatus = 'empty';
        }
      } else {
        resultStatus = 'Error en la solicitud';
      }
      loadChartData();
      
    } catch (error) {
      console.log(`Error parsing result: ${error}`);
      resultStatus = 'Error en la solicitud';
    }
  }

  onMount(async () => {
    getJobs();
    
  });

  // @ts-ignore
  async function loadChartData() {
    // @ts-ignore
    const territory = jobs.map(job => job.territory);
    console.log(territory);
    // @ts-ignore
    const years = jobs.map(job => job.year);
    console.log(years);
    // @ts-ignore
    const empleosEnIndustria = jobs.map(job => job.jobs_industry);
    console.log(empleosEnIndustria);
    // @ts-ignore
    const empresasConInnovaciones = jobs.map(job => job.companies_with_innovations);
    // @ts-ignore
    const empleoTemporal = jobs.map(job => job.temporary_employment);

    // @ts-ignore
    Highcharts.chart('container', {
  chart: {
    type: 'bar',  //  tipo de gráfico a bar
    backgroundColor: '#E0E0E0'
  },
  title: {
    text: 'Puestos De Trabajo Empleos empresas con innovaciones'
  },
  xAxis: {
    categories: territory,
    title: {
      text: null
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Cantidad',
      align: 'high'
    },
    labels: {
      overflow: 'justify'
    }
  },
  tooltip: {
    shared: true,
    pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true
      }
    }
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 80,
    floating: true,
    borderWidth: 1,
    shadow: true
  },
  series: [
    {
      name: 'Empleos en la industria',
      data: empleosEnIndustria
    },
    {
      name: 'Empresas con innovaciones',
      data: empresasConInnovaciones
    },
    {
      name: 'Empleo temporal',
      data: empleoTemporal
    }
  ]
});
      }

</script>
<svelte:head>
    
</svelte:head>
<main>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
    </figure>
</main>

<style>
  main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px); /* adjust according to your needs */
}

.highcharts-figure {
  max-width: 1200px; /* max width for the chart */
  padding-top: 20px; 
  margin: auto;
  width: 100%;
}

#container {
  height: 600px;
}

</style>