<script>
    import Highcharts from "highcharts";
    import Header from "../Header.svelte";
    // @ts-ignore
    import { onMount } from "svelte";
    // @ts-ignore
    import Button from "sveltestrap/src/Button.svelte";
  
    let ballData = [];
    var local = 0;
    var visitor = 0;
    var cont = 0; //partidos
    var URL = "https://www.balldontlie.io/api/v1/games?seasons[]=2022";
  
    //sumar puntajes y hacer proporcion
    async function loadGraph() {
      const ball = await fetch(URL);
      if (ball.ok) {
        ballData = await ball.json();
        console.log(`We have received ${ballData.length} data points: `);
        console.log(JSON.stringify(ballData, null, 2));
        // @ts-ignore
        ballData.data.forEach((dat) => {
          if (dat.home_team_score && dat.visitor_team_score) {
            local += dat.home_team_score;
            visitor += dat.visitor_team_score;
            cont++;
          }
        });
      } else {
        console.log("Error loading ball");
      }
  
      console.log(local);
      console.log(visitor);
  
      var local_p = (local * 100) / (local + visitor);
      var visitor_p = (visitor * 100) / (local + visitor);
  
      console.log("Locales: " + local_p);
      console.log("Visitantes: " + visitor_p);
  
      // Radialize the colors
      Highcharts.setOptions({
        // @ts-ignore
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
          return {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7,
            },
            stops: [
              [0, color],
              [1, Highcharts.color(color).brighten(-0.3).get("rgb")], // darken
            ],
          };
        }),
      });
  
      // Build the chart
      // @ts-ignore
      Highcharts.chart("container", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Porcentaje medio de puntos durante un partido de la NBA (Locales vs Visitantes), 2022",
          style: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
          },
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
              connectorColor: "silver",
            },
          },
        },
        series: [
          {
            name: "Porcentaje de puntos durante el partido",
            data: [
              { name: "Locales", y: local_p },
              { name: "Visitantes", y: visitor_p },
            ],
          },
        ],
      });
    }
  </script>
  
  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
  </svelte:head>
  
  <main class="bg-gray-100 py-8">
    <Header></Header>
    <div class="container mx-auto">
      <h1 class="text-center text-3xl font-bold my-4">Gráfico de Porcentaje de Puntos en la NBA</h1>
      <div id="container"></div>
    </div>
  </main>
  
  <style>
    main {
      min-height: 100vh;
    }
  </style>
  