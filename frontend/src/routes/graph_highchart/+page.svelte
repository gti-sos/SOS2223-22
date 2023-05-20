<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts/highstock';

  let jobs = [];

  async function getJobs() {
    const res = await fetch(`https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats`, {
      method: 'GET'
    });

    if (res.ok) {
      jobs = await res.json();
      loadChartData();
    } else {
      console.error('Error loading jobs data');
    }
  }

  onMount(getJobs);

  function loadChartData() {
    const categories = jobs.map(job => `${job.territory} (${job.year})`);
    const empleosEnIndustria = jobs.map(job => job.jobs_industry);
    const empresasConInnovaciones = jobs.map(job => job.companies_with_innovations);
    const empleoTemporal = jobs.map(job => job.temporary_employment);

    Highcharts.chart('container', {
      chart: {
        type: 'bar',
        backgroundColor: '#E0E0E0'
      },
      title: {
        text: 'Puestos De Trabajo Empleos empresas con innovaciones'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: 'Territorio (Año)'
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
