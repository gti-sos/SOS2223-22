<script>
  // @ts-nocheck
  //importar desde fuera
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '@fortawesome/fontawesome-free/css/all.css';
  //etiquetas
  import Header from "../Header.svelte";
  //svelte
  import { fade } from "svelte/transition";
  import { onMount } from 'svelte';


  let API = 'http://localhost:12345/api/v1/ict-promotion-strategy-stats/';
  //https://sos2223-22.appspot.com/api/v1/ict-promotion-strategy-stats/

  //datos principales
  let datos = [];
  let result = '';
  let resultStatus = '';

  let new_rec = {
      territory: "",
      year: "",
      ict_manufacturing_industry: "",
      wholesale_trade: "",
      edition_of_computer_program: "",
  };



  // mostrar html
  let mostrar_load = false;
  let mostrar_create = false;
  let mostrar_delete = false;
  let mostrar_delete_all = false;
  let editar_fila = false;

  //onMount -> cuando refrescas la pagina
  onMount(async () => {
    load_data();
  });

  async function load_ini_data(){
    //si datos[] está vacio, carga los datos iniciales
    if (datos.length === 0) {
      const res = await fetch('http://localhost:12345/api/v1/ict-promotion-strategy-stats/loadInitialData', {
        method: 'GET'
      });

      if (res.ok) {
        load_data(); // cargar tabla
        //showMessage("Datos cargados correctamente", "success");
      } else {
        //showMessage("Error al cargar los datos iniciales", "error");
      }  
    }
    // si datos[] no esta vacio, mensaje de advertencia
    else{
      let alerta = 'advert';
      mostrar_alerta(alerta);
    }
  }
  // carga los datos en la tabla
  async function load_data(){
    mostrar_load = true;
    mostrar_create = false;
    mostrar_delete = false;
    mostrar_delete_all = false;
    editar_fila = false;
    // Reseteamos las variables result y resultStatus a una cadena vacía
    resultStatus = result = '';
    // Enviamos una petición GET a la URL API usando fetch
    const res = await fetch(API, {
        method: 'GET'
    });
    
    try{
        // Si la respuesta es exitosa, convertimos la respuesta en formato JSON a un objeto JavaScript
        const data = await res.json();
        // Convertimos el objeto JavaScript a una cadena JSON y la asignamos result
        result = JSON.stringify(data, null,2);
        // Asignamos el objeto JavaScript a la variable datos
        datos = data;
    }catch(error){
        // Si hay un error al parsear los resultados, mostramos un mensaje de error en la consola
      console.log(`Error parseando los resultados: ${error}`);
    }
    
    // Obtenemos el estado de la respuesta y lo convertimos a una cadena, que asignamos a resultStatus
    const status = await res.status;
    resultStatus = status.toString();
  }
  //boton de crear recurso
  function bt_create_data(){
      mostrar_load = true;
      mostrar_create = true;
      mostrar_delete = false;
      mostrar_delete_all = false;
  }

  // crear recurso
  async function create_data(){
    resultStatus = result = "";
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          territory: new_rec.territory,
          year: parseInt(new_rec.year),
          //recurso.replace(",", ".") para evitar conflictos a la hora de añadir campos con decimales ',' o '.'
          ict_manufacturing_industry: parseFloat(new_rec.ict_manufacturing_industry.replace(",", ".")),
          wholesale_trade: parseFloat(new_rec.wholesale_trade.replace(",", ".")),
          edition_of_computer_program: parseFloat(new_rec.edition_of_computer_program.replace(",", ".")),
        }),
    });
    console.log(new_rec.year);
    const status = await res.status;
    resultStatus = status;
    if (status == 201) {
        load_data();
        let alerta = 'create_rec';
        mostrar_alerta(alerta, new_rec.year);
        
    }else{
        if (status == 400) {
            let alerta = "campos_vacios";
            mostrar_alerta(alerta);
        }else{
            if(status == 409){
              console.log("esntra aqui");
              let alerta = "repetido";
              mostrar_alerta(alerta, new_rec.year);
            }
        }
    }

  }

  //borrar un recurso especifico
  async function delete_data(year){
    resultStatus = result = "";
      const res = await fetch(API+year, {
          method: "DELETE",
      });
      const status = await res.status;
      resultStatus = status;
      if (status == 200) {
          load_data();
          let alerta = 'delete_rec';
          mostrar_alerta(alerta, year);
      }
  }

  //mensaje de borrar todos los rec
  function bt_delete_all(){
    if (datos.length === 0){
      //Mensaje de rec borrados
      let alerta = 'no_rec';
      mostrar_alerta(alerta);
    }
    else{
      mostrar_load = true;
      mostrar_create = false;
      mostrar_delete = false;
      mostrar_delete_all = true;
    }
  }
  // Borrar todos los recursos
  async function delete_all() {
    // Metodo DELETE
    const res = await fetch(API, {
      method: 'DELETE'
    });

    //Si realiza el metodo
    if (res.ok) {
      //datos = [] y muestra tabala vacia
      datos.splice(0, datos.length);
      load_data();

      //Mensaje de rec borrados
      let alerta = 'vacio';
      mostrar_alerta(alerta);

    } else {
      let alerta = 'error';
      mostrar_alerta(alerta);
    }
  }

  function bt_update_data(){
    editar_fila = true;
  }
  
  async function update_data(item) {
  const res = await fetch(API+item.year, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      territory: item.territory,
      year: item.year,
      ict_manufacturing_industry: item.ict_manufacturing_industry,
      wholesale_trade: item.wholesale_trade,
      edition_of_computer_program: item.edition_of_computer_program
    })
  });

  if (res.ok) {
    await load_data();
  }
}

function mostrar_alerta(a, y){
 // Mostramos la alerta
 //crear mensaje de alerta, dependiendo del tipo de mensaje que recibe
 const alert = document.createElement('div');
 if (a === 'advert'){
   alert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> No se pueden cargar los recursos iniciales si ya existen datos';
 }
 if (a === 'error'){
   alert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-danger"></i> Se ha producido un error';
 }
 if (a === 'vacio'){
   alert.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-info-circle"></i> Recursos borrados correctamente';
 }
 if (a === 'no_rec'){
   alert.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-times-circle"></i> No existen recursos';
 }
 if (a === 'delete_rec'){
   alert.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-check-circle"></i> Recurso del año '+y+' borrado correctamente';
 }
 if (a === 'campos_vacios'){
   alert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Hay campos incompletos';
 }
 if (a === 'repetido'){
   alert.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
   alert.setAttribute('role', 'alert');
   alert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Ya existe un recurso del año: '+y;
 }
 const container = document.querySelector('.container');
 container.insertBefore(alert, container.firstChild);
  // Ocultamos la alerta después de 3 segundos
  setTimeout(() => {
    alert.classList.remove('show');
    alert.classList.add('hide');
    setTimeout(() => {
      alert.remove();
    }, 1000);
  }, 3000);
 }

</script>
<main>
  <br>
  <Header></Header>
  <hr>
  <div class="container">
      <h2>API ICT Strategy | Carlos Gata Masero</h2>
      <br>
      <div class="opciones">
          <button type="button" on:click={load_ini_data} class="btn btn-warning"><i class="fas fa-spinner"></i> Cargar recursos iniciales</button>
          <button type="button" on:click={bt_create_data} class="btn btn-success"><i class="far fa-plus-square"></i> Crear recurso</button>
          <button type="button" on:click={bt_delete_all} class="btn btn-danger"><i class="fas fa-trash"></i> Borrar recursos</button>
      </div>
      <br>
      {#if mostrar_delete_all}
      <div class="formulario-caja">
          
            <div class="form-group">
              <label for="year">¿Está seguro que desea eliminar todos los recursos?</label>
            </div>
            <button type="submit" on:click={delete_all} class="btn btn-danger">Eliminar</button>
            <button type="submit" on:click={load_data} class="btn btn-dark">Cancelar</button>
      </div>
      {/if}
      {#if mostrar_create}
      <div class="formulario-caja caja-create">
          <form on:submit|preventDefault={create_data}>
            <div class="form-group">
              <label for="territory">Territory:</label>
              <input type="text" class="form-control" bind:value={new_rec.territory} name="territory" required>
            </div>
            <div class="form-group">
              <label for="year">Year:</label>
              <input type="text" class="form-control" bind:value={new_rec.year} name="year" required>
            </div>
            <div class="form-group">
              <label for="ict_manufacturing_industry">Industria manufacturera de TIC:</label>
              <input type="text" class="form-control" bind:value={new_rec.ict_manufacturing_industry} name="ict_manufacturing_industry" required>
            </div>
            <div class="form-group">
              <label for="wholesale_trade">Comercio al por mayor:</label>
              <input type="text" class="form-control" bind:value={new_rec.wholesale_trade} name="wholesale_trade" required>
            </div>
            <div class="form-group">
              <label for="edition_of_computer_program">Edición de programas informáticos:</label>
              <input type="text" class="form-control" bind:value={new_rec.edition_of_computer_program} name="edition_of_computer_program" required>
            </div>
            <button type="submit" class="btn btn-success">Enviar datos</button>
            <button type="submit" on:click={load_data} class="btn btn-dark">Cancelar</button>

          </form>
        </div>          
      {/if}
      <br>
      <div class="table">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Territory</th>
                <th>Year</th>
                <th>Industria manufacturera de TIC</th>
                <th>Comercio al por mayor</th>
                <th>Edición de programas informáticos</th>
                <th>Editar Recurso</th>
              </tr>
            </thead>
            {#if mostrar_load}
            <tbody>
              {#each datos as item}
              <tr>
                {#if editar_fila}
                  <td><input class="w-50" type="text" bind:value={item.territory}/></td>
                  <td>{item.year}</td>
                  <td><input class="w-50" type="number" bind:value={item.ict_manufacturing_industry}/></td>
                  <td><input class="w-50" type="number" bind:value={item.wholesale_trade}/></td>
                  <td><input class="w-50" type="number" bind:value={item.edition_of_computer_program}/></td>
                  <td>
                    <button type="button" on:click={update_data(item)} class="btn btn-primary"><i class="fas fa-sync-alt"></i> Actualizar</button>
                    <button type="button" on:click={load_data} class="btn btn-dark"><i class="fas fa-times"></i> Cancelar</button>
                  </td>
                {:else}
                  <td>{item.territory}</td>
                  <td>{item.year}</td>
                  <td>{item.ict_manufacturing_industry}</td>
                  <td>{item.wholesale_trade}</td>
                  <td>{item.edition_of_computer_program}</td>
                  <td>
                    <button type="button" on:click={bt_update_data} class="btn btn-primary"><i class="fas fa-sync-alt"></i> Actualizar</button>
                    <button type="button" on:click={delete_data(item.year)} class="btn btn-danger"><i class="fas fa-trash"></i> Borrar</button>
                  </td>
                {/if}
              </tr>
              {/each}
            </tbody>
            {/if}
          </table>
      </div>
  </div>
</main>
<style>
  
  .opciones{
      text-align: center;
  }
  .opciones button{
      margin: 5px;;
  }
  h2{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: darkcyan;
      text-align: center;
  }
  thead{
    color: white;
    background-color: #212529;
  }
  .table tbody tr:hover {
      background-color: rgba(0, 139, 139, 0.21);
  }

  .formulario-caja {
      width: 60%;
      margin: 0 auto;
      padding: 20px;
      border-radius: 5px;
      border: 2px solid #dc3545;
      background-color: #f2f2f2;
  }
  .caja-create{
    border: 2px solid #198754 !important;
  }
  .form-group {
      margin-bottom: 20px;
  }
  label {
      font-weight: bold;
  }

</style>
