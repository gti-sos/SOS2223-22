<script>
// @ts-nocheck

    import Highcharts from 'highcharts';
    import { onMount } from 'svelte';
  
    let capacityData = [];
  
    async function fetchSpaceXData() {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/capsules');
        const data = await response.json();
  
        capacityData = data.map((capsule) => ({
          capsuleSerial: capsule.capsule_serial,
          flightCount: capsule.missions.length > 0 ? capsule.missions[0].flight : 0,
        }));
      } catch (error) {
        console.error('Error al obtener los datos de SpaceX:', error);
      }
    }
  
    onMount(async () => {
      await fetchSpaceXData();
  
      const chartOptions = {
        chart: {
          type: 'areaspline',
        },
        title: {
          text: 'Recuento de vuelos por número de serie de la cápsula SpaceX',
        },
        xAxis: {
          categories: capacityData.map((d) => d.capsuleSerial),
        },
        yAxis: {
          title: {
            text: 'Recuento de vuelos',
          },
        },
        series: [
          {
            name: 'Recuento de vuelos',
            data: capacityData.map((d) => d.flightCount),
          },
        ],
      };
  
      Highcharts.chart('chart', chartOptions);
    });
  </script>
  
  <div id="chart"></div>
  