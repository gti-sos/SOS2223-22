<script>
// @ts-nocheck

    import { onMount, afterUpdate } from 'svelte';
    import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';
    import Header from "../Header.svelte";
  
    Chart.register(BarController, LinearScale, CategoryScale, BarElement);
  
    let jobs = [];
    let myChart;
  
    async function getJobs() {
      const res = await fetch(`https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats`, {
        method: 'GET'
      });
  
      if (res.ok) {
        jobs = await res.json();
      } else {
        console.error('Error loading jobs data');
      }
    }
  
    async function loadChartData() {
      const territory = jobs.map(job => job.territory);
      const empleosEnIndustria = jobs.map(job => job.jobs_industry);
      const empresasConInnovaciones = jobs.map(job => job.companies_with_innovations);
      const empleoTemporal = jobs.map(job => job.temporary_employment);
  
      // @ts-ignore
      const ctx = document.getElementById('myChart').getContext('2d');
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: territory,
          datasets: [
            {
              label: 'Empleos en la industria',
              data: empresasConInnovaciones,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Territory'
              }
            },
            y: {
              type: 'linear',
              title: {
                display: true,
                text: 'Empresas con Innovaciones'
              }
            }
          }
        }
      });
    }
  
    onMount(async () => {
      await getJobs();
      loadChartData();
    });
  
    afterUpdate(() => {
      if (myChart) {
        myChart.update();
      }
    });
  
  </script>
  
  <svelte:head>
      
  </svelte:head>
  
  <main>
 
    <div id="chartContainer">
      <canvas id="myChart"></canvas>
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  
    #chartContainer {
      max-width: 800px;
      width: 100%;
      margin: 0 auto;
      padding: 20px;
      background: #fff;
      box-shadow: 0px 5px 20px rgba(0,0,0,0.1);
    }
  
    #myChart {
      height: 400px;
    }
  </style>
  