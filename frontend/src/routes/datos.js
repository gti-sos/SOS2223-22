
    import { onMount } from 'svelte';
    
        //let API = 'https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats/';
        let API = 'http://localhost:12345/api/v2/jobs-companies-innovation-stats/';
          /**
           * @type {any[]}
           */
          export let jobs = [];
          let limit = 10;
          let offset = 0;
          let territory = "";
          let year = "";
          let trabajos= "";
          let resources = [];
          let companias = "";
          let empleos = "";
          let resultStatus ="";
          let result ="";
    
        export async function getJobs() {
          
          resultStatus = result = '';
          // const res = await fetch(`https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats?offset=${offset}&limit=${limit}`, {
            const res = await fetch(`http://localhost:12345/api/v2/jobs-companies-innovation-stats/loadInitialData`, {
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
            console.log(jobs); 
          } catch (error) {
            console.log(`Error parsing result:${error}`);
            resultStatus = 'Error en la solicitud';
          }
        }
          
        onMount(async () => {
              getJobs();
              
          }); 
         
      