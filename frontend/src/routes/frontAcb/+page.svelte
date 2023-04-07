<script>
// @ts-nocheck
    import { fade } from "svelte/transition";

    import { onMount } from 'svelte';
  
    let API = 'https://sos2223-22.appspot.com/api/v1/jobs-companies-innovation-stats/';//http://localhost:12345/api/v1/jobs-companies-innovation-stats/
    /**
     * @type {any[]}
     */
    let jobs = [];

    let result = '';
    let resultStatus = '';
  
     // Agrega una variable para controlar si se debe mostrar el formulario
  let showForm = false;



// Agrega un objeto para almacenar los valores del formulario
let formData = {
  territory: "",
  year: "",
  jobs_industry: "",
  companies_with_innovations: "",
  temporary_employment: "",
};

let showDeleteForm = false;

function toggleDeleteForm() {
  showDeleteForm = !showDeleteForm;
}

let deleteFormData = {
  territory: "",
};

async function handleDelete() {
  const res = await fetch(API + deleteFormData.territory, {
    method: "DELETE",
  });

  if (res.ok) {
    getJobs(); // Actualizar los datos en la tabla
    alert("Recurso eliminado correctamente");
  } else {
    alert("Recurso no encontrado:"+deleteFormData.territory);
  }
}
  // Agrega una variable para controlar si los campos están en modo de edición
  let editMode = false;

  /**
     * @param {{ territory: any; year: any; jobs_industry: any; companies_with_innovations: any; temporary_employment: any; }} job
     * @param {string | number} index
     */
  async function handleUpdate(job, index) {
    // Cambia el modo de edición a true
    editMode = true;

    // Crea un objeto para almacenar los nuevos valores
    let updatedJob = {
      territory: job.territory,
      year: job.year,
      jobs_industry: job.jobs_industry,
      companies_with_innovations: job.companies_with_innovations,
      temporary_employment: job.temporary_employment,
    };

    // Actualiza los valores de la fila correspondiente
    updatedJob = await updateJob(updatedJob, index);

    // Si se realizó la actualización correctamente, cambia el modo de edición a false
    if (updatedJob) {
      editMode = false;
    }
  }
  /**
     * @param {string | number} index
     */
  async function saveRow(index) {
      // @ts-ignore
        const job = jobs[index];
        await handleUpdate(job, index);
  }



  // Función para hacer una solicitud PUT a la API con los nuevos valores
  /**
     * @param {{ territory: any; year: any; jobs_industry: any; companies_with_innovations: any; temporary_employment: any; }} job
     * @param {string | number} index
     */
  async function updateJob(job, index) {
    const response = await fetch(API+ `${job.territory}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    if (response.ok) {
      // Actualiza los datos en la tabla
      // @ts-ignore
      jobs[index] = job;
      return job;
    } else {
      alert("Porfavor, rellena todos los campos");
    }
  }


  /**
     * @type {string | number | null}
     */
  let selectedRowIndex = null;

// ...

/**
     * @param {string | number | null} index
     */
function editRow(index) {
  // Desactivar la edición de la fila previamente seleccionada
  if (selectedRowIndex !== null) {
    // @ts-ignore
    jobs[selectedRowIndex].editing = false;
  }
  // Activar la edición de la nueva fila seleccionada
  selectedRowIndex = index;
  // @ts-ignore
  jobs[selectedRowIndex].editing = true;
}
// Función para manejar el clic en el botón "Crear recurso"
function toggleForm() {
  showForm = !showForm;
}
// Función para cargar los datos iniciales
async function loadInitialData() {
      const res = await fetch(API+'loadInitialData', {
        method: 'GET'
      });
      if (res.ok) {
        
        getJobs(); // Actualizar los datos en la tabla
        alert("Datos cargados correctamente");
      } else {
        alert('Error al cargar los datos iniciales');
      }
    }
  
     // Función para eliminar todos los recursos
     async function deleteResources() {
      const res = await fetch(API, {
        method: 'DELETE'
      });
      if (res.ok) {
        
        getJobs(); // Actualizar los datos en la tabla
        alert("Recursos eliminados correctamente");
      } else {
        alert('Error al eliminar los recursos');
      }
    }

// Función para manejar el envío del formulario
async function handleSubmit() {
    const companies_with_innovations = parseFloat(formData.companies_with_innovations);
    const temporary_employment = parseFloat(formData.temporary_employment);
    // Validación básica antes de enviar el formulario
  if (
    !formData.territory ||
    formData.year === null ||
    formData.jobs_industry === null ||
    formData.companies_with_innovations === null ||
    formData.temporary_employment === null ||
    !Number.isInteger(formData.year) ||
    !Number.isInteger(formData.jobs_industry) ||
    !(Number(companies_with_innovations) === companies_with_innovations && companies_with_innovations % 1 !== 0) ||
    !(Number(temporary_employment) === temporary_employment && temporary_employment % 1 !== 0)
  
  ) {
    alert("Por favor, complete todos los campos con los tipos de datos correctos");
    return;
  }
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    // Actualizar los datos y ocultar el formulario
    
    getJobs();
    alert("Recurso creado correctamente");
    showForm = false;
  } else {
    alert("Error al crear el recurso. Ya existe.");
  }
}


async function getJobs() {
  resultStatus = result = '';
  const res = await fetch(API, {
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
  } catch (error) {
    console.log(`Error parsing result:${error}`);
    resultStatus = 'Error en la solicitud';
  }
}

  
    onMount(async () => {
      getJobs();
    });
  </script>
  
  <style>
    .form-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  form {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }

  form input {
    width: 100%;
    padding: 6px 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  form button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  form button:hover {
    background-color: #45a049;
  }

button {
    font-size: 0.8rem; /* Hacer el texto del botón más pequeño */
    padding: 6px 12px; /* Ajustar el tamaño del botón */
    margin-right: 10px; /* Separar los botones entre sí */
    background-color: #4CAF50; /* Color de fondo del botón */
    color: white; /* Color del texto del botón */
    border: none; /* Quitar los bordes del botón */
    cursor: pointer; /* Cambiar el cursor al pasar el cursor sobre el botón */
    border-radius: 4px; /* Agregar bordes redondeados al botón */
  }

  button:hover {
    background-color: #45a049; /* Cambiar el color de fondo del botón al pasar el cursor */
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-right: 10%;
    margin-bottom: 20px;
  }
  table {
    border-collapse: collapse;
    width: 80%;
    margin: 30px auto; /* Agregar márgenes alrededor de la tabla */
    border: 2px solid #ccc; /* Agregar bordes a la tabla */
  }
  th, td {
    text-align: left;
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
    font-weight: bold; /* Hacer que el texto de los encabezados sea negrita */
  }
  tr:nth-child(even) {
    background-color: #f2f2f2; /* Agregar color de fondo a las filas pares */
  }
  tr:hover {
    background-color: #ddd; /* Cambiar el color de fondo de las filas al pasar el cursor */
  }
  .title {
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 2rem;
  color: #4CAF50;
  margin-top: 20px;
  margin-bottom: 20px;
}

  </style>
  
  <h1 class="title">API JOBS - Antonio Carranza</h1>

  {#if !showForm}
  {#if resultStatus === "200"}
    <table in:fade={{ duration: 300 }}>
      <thead>
        <tr>
          <th>Territory</th>
          <th>Year</th>
          <th>Jobs Industry</th>
          <th>Companies with Innovations</th>
          <th>Temporary Employment</th>
          <th></th> <!-- Nueva columna para el botón de actualizar -->
        </tr>
      </thead>
      <tbody>
        {#each jobs as job, index}
  <tr>
    {#if job.editing} <!-- Si la fila está en modo edición -->
    
      <td><input type="text" bind:value={job.territory} disabled /></td>
      <td><input type="number" bind:value={job.year} /></td>
      <td><input type="number" bind:value={job.jobs_industry} /></td>
      <td><input type="number" step="0.01" bind:value={job.companies_with_innovations} /></td>
      <td><input type="number" step="0.01" bind:value={job.temporary_employment} /></td>
    {:else} <!-- Si la fila no está en modo edición -->
      <td>{job.territory}</td>
      <td>{job.year}</td>
      <td>{job.jobs_industry}</td>
      <td>{job.companies_with_innovations}</td>
      <td>{job.temporary_employment}</td>
    {/if}
    <td>
      {#if !job.editing}
        <button on:click={() => editRow(index)}>Actualizar</button>
      {:else}
        <button on:click={() => saveRow(index)}>Guardar</button>
      {/if}
    </td>
  </tr>
{/each}
      </tbody>
    </table>
  {:else if resultStatus === "404"}
    <p>Error: Data not found</p>
  {:else}
    <p>Lista de recursos vacia</p>
  {/if}
  {/if}
<div class="button-container">
<!-- Agrega el botón "Crear recurso" -->
<button on:click={toggleForm}>Crear recurso</button>
<button on:click={loadInitialData}>Cargar recursos</button>
<!-- Botón "Borrar recursos" -->
<button on:click={deleteResources}>Borrar recursos</button>
<!-- Botón "Borrar un recurso" -->
<button on:click={toggleDeleteForm}>Borrar un recurso</button>
</div>
<!-- Formulario para eliminar un recurso por territorio -->
{#if showDeleteForm}
  <form on:submit|preventDefault={handleDelete}>
    <label for="delete_territory">Territorio</label>
    <input type="text" id="delete_territory" bind:value={deleteFormData.territory} required />
    <button type="submit">Eliminar</button>
  </form>
{/if}
<!-- Agrega el formulario para enviar datos -->
{#if showForm}
<div class="form-container"  in:fade={{ duration: 300 }}>
<form on:submit|preventDefault={handleSubmit}>
    <label for="territory">Territory</label>
    <input type="text" id="territory" bind:value={formData.territory} required />
  
    <label for="year">Year</label>
    <input type="number" id="year" bind:value={formData.year} required />
  
    <label for="jobs_industry">Jobs Industry</label>
    <input type="number" id="jobs_industry" bind:value={formData.jobs_industry} required />
  
    <label for="companies_with_innovations">Companies with Innovations</label>
    <input type="number" id="companies_with_innovations" bind:value={formData.companies_with_innovations} step="0.01" required />
  
    <label for="temporary_employment">Temporary Employment</label>
    <input type="number" id="temporary_employment" bind:value={formData.temporary_employment} step="0.01" required />
  
    <button type="submit">Enviar</button>
  </form>
</div>
{/if}