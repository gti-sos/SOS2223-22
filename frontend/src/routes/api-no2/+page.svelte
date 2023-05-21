<script>
// @ts-nocheck

  import { onMount } from 'svelte';
  import axios from 'axios';
  import Highcharts from 'highcharts';

  // Función para obtener los datos de NO2 para los países de Europa
  async function fetchNO2Data() {
    try {
      const response = await axios.get('https://api.openaq.org/v1/measurements?parameter=no2&limit=10000');
      const measurements = response.data.results;

      // Filtra y procesa los datos para obtener los valores necesarios para la gráfica
      const europeData = measurements.filter(measurement => 
          measurement.country === 'ES' || // España
          measurement.country === 'FR' || // Francia
          measurement.country === 'DE' || // Alemania
          measurement.country === 'IT' || // Italia
          measurement.country === 'UK' || // Reino Unido
          measurement.country === 'PT' || // Portugal
          measurement.country === 'SE' || // Suecia
          measurement.country === 'FI' || // Finlandia
          measurement.country === 'NO' || // Noruega
          measurement.country === 'DK' || // Dinamarca
          measurement.country === 'PL' || // Polonia
          measurement.country === 'AT' || // Austria
          measurement.country === 'BE' || // Bélgica
          measurement.country === 'CH' || // Suiza
          measurement.country === 'CZ' || // República Checa
          measurement.country === 'IE' || // Irlanda
          measurement.country === 'GR' || // Grecia
          measurement.country === 'HU' || // Hungría
          measurement.country === 'RO'    // Rumanía
)
.map(measurement => ({
  country: measurement.country,
  value: measurement.value
}));


      // Agrupa los datos por país
      const groupedData = europeData.reduce((acc, cur) => {
        const { country, value } = cur;
        acc[country] = acc[country] || [];
        acc[country].push(value);
        return acc;
      }, {});

      // Crea el array de series para Highcharts
      const seriesData = Object.entries(groupedData).map(([country, values]) => ({
        name: country,
        y: values.reduce((sum, value) => sum + value, 0) / values.length,
        drilldown: country
      }));

      // Crea el array de categorías y datos para la gráfica
      const categories = Object.keys(groupedData);
      const chartData = Object.values(groupedData).map(values => values.reduce((sum, value) => sum + value, 0) / values.length);

      // Configuración de la gráfica de Highcharts
      const chartOptions = {
        chart: {
          type: 'scatter',
          width: 600,
          height: 400
        },
        title: {
          text: 'Datos de NO2 para los países de Europa'
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: 'Niveles de NO2'
          }
        },
        series: [{
          name: 'Promedio NO2',
          data: chartData,
          colorByPoint: true
        }]
      };

      // Crear la gráfica utilizando Highcharts
      Highcharts.chart('no2Chart', chartOptions);

    } catch (error) {
      console.error('Error al obtener los datos de NO2:', error);
    }
  }

  // Llama a la función fetchNO2Data cuando se monta el componente
  onMount(fetchNO2Data);
</script>
<div id="no2Chart"></div>

<style>
  #no2Chart {
    max-width: 600px;
    margin: 2rem auto;
  }
</style>
