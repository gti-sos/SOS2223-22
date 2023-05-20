<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    let datos_cgm = [];
    let API = 'http://localhost:12345/api/v2/ict-promotion-strategy-stats/';



  onMount(async () => {
    load_data();
  });

  async function load_data(){
    // Enviamos una petición GET a la URL API usando fetch
    const res = await fetch(API, {
        method: 'GET'
    });
    
    try{
        // Si la respuesta es exitosa, convertimos la respuesta en formato JSON a un objeto JavaScript
        const data = await res.json();
        // Convertimos el objeto JavaScript a una cadena JSON y la asignamos result
        const result = JSON.stringify(data, null,2);
        // Asignamos el objeto JavaScript a la variable datos
        datos_cgm = data;
        console.log("datos: "+datos_cgm.length);
        console.log("A");
    }catch(error){
        // Si hay un error al parsear los resultados, mostramos un mensaje de error en la consola
      console.log(`Error parseando los resultados: ${error}`);
    }
  }
</script>