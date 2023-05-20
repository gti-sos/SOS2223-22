<head>
  <script src="https://code.highcharts.com/highcharts.js"></script>
</head>

<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';
    import { redirect } from '@sveltejs/kit';

  // @ts-ignore
  let datos_cgm = [];
  let chart;
  let API = 'http://localhost:12345/api/v2/ict-promotion-strategy-stats/';

  onMount(async () => {
    await load_data();
    draw_chart();
  });

  async function load_data() {
    try {
      const res = await fetch(API, { method: 'GET' });
      const data = await res.json();
      datos_cgm = data;
    } catch (error) {
      console.log(`Error al cargar los datos: ${error}`);
    }
  }

  function draw_chart() {
    // @ts-ignore
    const seriesData = datos_cgm.map(({ year, ict_manufacturing_industry, wholesale_trade, edition_of_computer_program }) =>
      [year, ict_manufacturing_industry, wholesale_trade, edition_of_computer_program]
    );

    const chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Gráfica de area | Highcharts'
      },
      xAxis: {
        title: {
          text: 'Año'
        }
      },
      yAxis: {
        title: {
          text: 'Valor'
        }
      },
      series: [{
        name: 'Industria manufacturera de TIC',
        data: seriesData.map(([year, ict_manufacturing_industry]) => [year, ict_manufacturing_industry])
      }, {
        name: 'Comercio mayorista',
        data: seriesData.map(([year, , wholesale_trade]) => [year, wholesale_trade])
      }, {
        name: 'Edición de programas informáticos',
        data: seriesData.map(([year, , , edition_of_computer_program]) => [year, edition_of_computer_program])
      }]
    };

    // @ts-ignore
    chart = Highcharts.chart('chart-container', chartOptions);
  }
</script>

<main>
  <div id="chart-container"></div>
</main>
