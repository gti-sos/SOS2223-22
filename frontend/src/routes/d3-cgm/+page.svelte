<head>
    <script src="https://d3js.org/d3.v7.min.js"></script>
  </head>
  
  <script>
    import { onMount } from 'svelte';
  
    // @ts-ignore
    let datos_cgm = [];
    // @ts-ignore
    // @ts-ignore
    let chart;
    let API = 'https://sos2223-22.appspot.com/api/v2/ict-promotion-strategy-stats/';
  
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
  const territory = datos_cgm[0].territory; // Suponiendo que territory está presente en todos los datos

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  // @ts-ignore
  const svg = d3.select('#chart-container')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // @ts-ignore
  const xField = 'ict_manufacturing_industry'; // Campo para el eje X

  // @ts-ignore
  const x = d3.scaleBand()
    // @ts-ignore
    .domain(datos_cgm.map(d => d.year))
    .range([0, width])
    .padding(0.1);

  // @ts-ignore
  const y = d3.scaleLinear()
    // @ts-ignore
    .domain([0, d3.max(datos_cgm, d => d.ict_manufacturing_industry)])
    .range([height, 0]);

  svg.selectAll('rect')
    // @ts-ignore
    .data(datos_cgm)
    .enter()
    .append('rect')
    // @ts-ignore
    .attr('x', d => x(d.year))
    // @ts-ignore
    .attr('y', d => y(d.ict_manufacturing_industry))
    .attr('width', x.bandwidth())
    // @ts-ignore
    .attr('height', d => height - y(d.ict_manufacturing_industry))
    .attr('fill', 'steelblue')
    .on('mousemove', handleMouseMove)
    .on('mouseleave', handleMouseLeave);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    // @ts-ignore
    .call(d3.axisBottom(x));

  svg.append('g')
    // @ts-ignore
    .call(d3.axisLeft(y));

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', -10)
    .attr('text-anchor', 'middle')
    .text(`Gráfico de barras - ${territory} (Industria de fabricación de TIC)`);

  // Agregar interactividad al gráfico
  // @ts-ignore
  const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // @ts-ignore
  function handleMouseMove(event, d) {
    const year = d.year;
    const value = d.ict_manufacturing_industry;

    tooltip.style('opacity', 1)
      .style('left', `${event.pageX}px`)
      .style('top', `${event.pageY}px`)
      .html(`<strong>Año: ${year}</strong><br/>Valor: ${value}`);
  }

  function handleMouseLeave() {
    tooltip.style('opacity', 0);
  }
}


  </script>
  
  <main><br><br>
    <div id="chart-container"></div>
  </main>