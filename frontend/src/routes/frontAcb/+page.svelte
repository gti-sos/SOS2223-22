<script>
// @ts-nocheck
    import { fade } from "svelte/transition";
    import "../styles.css";
    import { onMount } from 'svelte';

  
    let API = 'https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats/';
    //http://localhost:12345/api/v1/jobs-companies-innovation-stats/
    /**
     * @type {any[]}
     */
    let jobs = [];
    let limit = 10;
    let offset = 0;

    let filterData = {
      territory: "",
      year: "",
      jobs_industry: "",
      companies_with_innovations: "",
      temporary_employment: "",
    };
    async function handleFilter(event) {
      event.preventDefault();

      const territory = document.getElementById("territory").value;
      const year = document.getElementById("year").value;
      const jobsIndustry = document.getElementById("jobs_industry").value;
      const companiesWithInnovations = document.getElementById("companies_with_innovations").value;
      const temporaryEmployment = document.getElementById("temporary_employment").value;

      let apiUrl = "https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats/";

      if (territory) {
          apiUrl += territory;
          if (year) {
              apiUrl += `/${year}`;
              if (jobsIndustry) {
                  apiUrl += `/${jobsIndustry}`;
                  if (companiesWithInnovations) {
                      apiUrl += `/${companiesWithInnovations}`;
                      if (temporaryEmployment) {
                          apiUrl += `/${temporaryEmployment}`;
                      }
                  }
              }
          }
    }

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const results = await response.json();
            displayResults(results);
        } else {
            console.error("Error fetching data:", response.status, response.statusText);
            showMessage("No se han encontrado recursos","error");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


    function handlePrevPage() {
    offset = Math.max(offset - limit, 0);
    getJobs();
}

    function handleNextPage() {
      offset += limit;
      getJobs();
    }

    

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
  showForm = false;
}

let deleteFormData = {
  territory: "",
  year: "",
};


async function handleDelete() {
  const res = await fetch(`${API}${deleteFormData.territory}/${deleteFormData.year}`, {
    method: "DELETE",
  });

  if (res.ok) {
    getJobs(); // Actualizar los datos en la tabla
    showMessage("Recurso eliminado correctamente", "success");
  } else {
    showMessage(`Recurso no encontrado: ${deleteFormData.territory}/${deleteFormData.year}`, "error");
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

    /**
 * Muestra un mensaje en el elemento con el ID "messages".
 * @param {string} message - El mensaje que se va a mostrar.
 * @param {string} [type] - El tipo de mensaje, puede ser "success", "warning" o "error". Predeterminado es "success".
 */
/*
function showMessage(message, type = "success") {
  const messages = document.getElementById("messages");
  messages.innerHTML = `<div class="message ${type}">${message}</div>`;
  console.log(`Mensaje: ${message}, Tipo: ${type}`);
}

*/
function showMessage(message, type = "success") {
  const messages = document.getElementById("messages");
  const messageElement = document.createElement("div");

  messageElement.className = `message ${type}`;
  messageElement.innerHTML = message;
  messages.appendChild(messageElement);
  console.log(`Mensaje: ${message}, Tipo: ${type}`);

  // Hacer que el mensaje desaparezca después de 5 segundos (5000 milisegundos)
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
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
      showMessage("Porfavor, rellena todos los campos","warning");
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
  showDeleteForm = false;
  

}
// Función para cargar los datos iniciales
async function loadInitialData() {
      const res = await fetch(API+"loadInitialData", {
        method: 'GET'
      });
      if (res.ok) {
        
        getJobs(); // Actualizar los datos en la tabla
        showMessage("Datos cargados correctamente", "success");
      } else {
        showMessage("Error al cargar los datos iniciales", "error");
      }
    }
  
     // Función para eliminar todos los recursos
     async function deleteResources() {
      const res = await fetch(API, {
        method: 'DELETE'
      });
      if (res.ok) {
        
        getJobs(); // Actualizar los datos en la tabla
        showMessage("Recursos eliminados correctamente", "success");
      } else {
        showMessage("Error al eliminar los recursos", "error");
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
    showMessage("Por favor, complete todos los campos con los tipos de datos correctos","error");
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
    showMessage("Recurso creado correctamente", "success");
    showForm = false;
  } else {
    showMessage("Error al crear el recurso. Ya existe.", "error");
  }
}


async function getJobs() {
  
  resultStatus = result = '';
  const res = await fetch(`https://sos2223-22.appspot.com/api/v2/jobs-companies-innovation-stats?offset=${offset}&limit=${limit}`, {
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
  

  
  <h1 class="title">API JOBS - Antonio Carranza</h1>
  <div id="messages" class="message"></div>
    <form id="filter-form"   on:submit={handleFilter(event)}>
      <div class="form-row">
        <div class="form-group col-md-2">
          <input type="text" class="form-control" id="territory" placeholder="Territorio">
        </div>
        <div class="form-group col-md-2">
          <input type="number" class="form-control" id="year" placeholder="Año">
        </div>
        <div class="form-group col-md-2">
          <input type="number" class="form-control" id="jobs_industry" placeholder="Trabajos en la Industria">
        </div>
        <div class="form-group col-md-2">
          <input type="number" class="form-control" id="companies_with_innovations" placeholder="Compañías con Innovaciones">
        </div>
        <div class="form-group col-md-2">
          <input type="number" class="form-control" id="temporary_employment" placeholder="Empleo Temporal">
        </div>
        <div class="form-group col-md-2">
          <button type="submit" class="btn btn-primary">Buscar</button>
        </div>
      </div>
    </form>
    
    


  {#if !showForm}
  {#if resultStatus === "200"}
    <table in:fade={{ duration: 300 }}>
      

      <thead>
        <tr>
          <th>Territorio</th>
          <th>Año</th>
          <th>Trabajos en la Industria</th>
          <th>Compañias con Innovaciones</th>
          <th>Empleo temporal</th>
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
  <button on:click={toggleForm}>Crear recurso</button>
  <button on:click={loadInitialData}>Cargar recursos</button>
  <!-- Botón "Borrar recursos" -->
  <button on:click={deleteResources}>Borrar recursos</button>
<!-- Botón "Borrar un recurso" -->
<button on:click={toggleDeleteForm}>Borrar un recurso</button>
<button on:click={handlePrevPage}>Anterior</button>
<button on:click={handleNextPage}>Siguiente</button>




</div>
<!-- Formulario para eliminar un recurso por territorio y año -->
{#if showDeleteForm}
  <form on:submit|preventDefault={handleDelete}>
    <label for="delete_territory">Territorio</label>
    <input type="text" id="delete_territory" bind:value={deleteFormData.territory} required />
    <label for="delete_year">Año</label>
    <input type="text" id="delete_year" bind:value={deleteFormData.year} required />
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