<script>
  // @ts-nocheck
  import { onMount, afterUpdate } from 'svelte';
  import axios from 'axios';
  import Highcharts from 'highcharts';

  let cryptoData = null;
  let maxPrice = 0; // Variable para almacenar el precio máximo
  let priceRange = maxPrice; // Valor inicial del rango de precios en euros

  // Tasa de cambio EUR a USD
  const exchangeRate = 1.18; // Actualiza este valor con la tasa de cambio actual

  onMount(async () => {
    try {
      const response = await axios.get('https://api.coincap.io/v2/assets');
      cryptoData = response.data.data;

      createChart();
    } catch (error) {
      console.error(error);
    }
  });

  afterUpdate(() => {
    updateChart();
  });

  const createChart = () => {
    if (cryptoData) {
      const chartData = cryptoData.map(crypto => ({
        name: crypto.name,
        y: parseFloat(crypto.priceUsd) * exchangeRate,
        color: parseFloat(crypto.priceUsd) * exchangeRate > priceRange ? 'red' : 'blue'
      }));

      maxPrice = Math.max(...chartData.map(crypto => crypto.y));
      priceRange = maxPrice;

      Highcharts.chart('chart-container', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Crypto Prices'
        },
        xAxis: {
          categories: chartData.map(crypto => crypto.name)
        },
        yAxis: {
          title: {
            text: 'Price (EUR)'
          },
          min: 0,
          max: priceRange, // Establecer el rango máximo del eje Y
          tickInterval: 100 // Intervalo de los ticks del eje Y
        },
        tooltip: {
          valueSuffix: ' €' // Sufijo para el valor en el tooltip
        },
        plotOptions: {
          column: {
            colorByPoint: true
          }
        },
        series: [{
          name: 'Price',
          data: chartData.map(crypto => ({
            y: crypto.y,
            color: crypto.color
          }))
        }]
      });
    }
  };

  const updateChart = () => {
    if (cryptoData) {
      const chartData = cryptoData.map(crypto => ({
        name: crypto.name,
        y: parseFloat(crypto.priceUsd) * exchangeRate,
        color: parseFloat(crypto.priceUsd) * exchangeRate > priceRange ? 'red' : 'blue'
      }));

      Highcharts.charts[0].yAxis[0].update({
        max: priceRange // Actualizar el rango máximo del eje Y
      });

      Highcharts.charts[0].series[0].setData(chartData.map(crypto => ({
        y: crypto.y,
        color: crypto.color
      })));
    }
  };

  const updatePriceRange = (event) => {
    priceRange = parseFloat(event.target.value);
    updateChart();
  };
</script>

<main>
  <h1>API del precio de las criptomonedas</h1>
  <h5>Integramos los datos en una gráfica Highcharts</h5>
  <div id="chart-container"></div>
  <input type="range" min="0" max="32000" step="100" bind:value={priceRange} on:input={updatePriceRange}>
  <p>Price Range: 0 - {priceRange} €</p>
  <p>
    <span style="color: blue;">Cryptos con precio menor o igual al rango seleccionado.</span>
    <br>
    <span style="color: red;">Cryptos con precio mayor al rango seleccionado.</span>
  </p>
</main>


<style>
  main {
    text-align: center;
    padding: 2rem;
  }
</style>
