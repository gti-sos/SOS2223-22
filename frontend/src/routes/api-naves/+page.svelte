<head>
    <script src="https://d3js.org/d3.v7.min.js"></script>
  </head>
  
  <script>
    // @ts-nocheck
    import { onMount, afterUpdate } from 'svelte';
    import { select, scaleBand, scaleLinear, max, area, axisBottom, axisLeft } from 'd3';
  
    let capacityData = [];
  
    async function fetchSpaceXData() {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/capsules');
        const data = await response.json();
  
        capacityData = data.map((capsule) => ({
          name: capsule.name,
          crewCapacity: capsule.crew_capacity,
        }));
      } catch (error) {
        console.error('Error al obtener los datos de SpaceX:', error);
      }
    }
  
    onMount(fetchSpaceXData);
  
    let chartData = [];
  
    afterUpdate(() => {
      chartData = capacityData;
  
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      const svg = select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      const x = scaleBand()
        .domain(chartData.map((d) => d.name))
        .range([0, width])
        .padding(0.1);
  
      const y = scaleLinear()
        .domain([0, max(chartData, (d) => d.crewCapacity)])
        .range([height, 0]);
  
      const areaPath = area()
        .x((d) => x(d.name) + x.bandwidth() / 2)
        .y0(height)
        .y1((d) => y(d.crewCapacity));
  
      svg.append('path')
        .datum(chartData)
        .attr('class', 'area')
        .attr('d', areaPath);
  
      const xAxis = axisBottom(x);
      const yAxis = axisLeft(y);
  
      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
  
      svg.append('g')
        .attr('class', 'y-axis')
        .call(yAxis);
    });
  </script>
  
  <div id="chart"></div>
  
  <style>
    .area {
      fill: #cce5ff;
      stroke: #007bff;
      stroke-width: 1.5;
    }
  </style>
  