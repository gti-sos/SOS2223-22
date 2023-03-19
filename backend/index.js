var express = require('express');
var acb = require("../backend/index-ACB");
var cool = require('cool-ascii-faces');
var cgm = require("../index-CGM");
var bodyParser = require("body-parser");
const backend = require('../backend');
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v1";
var dataACB = [];


module.exports = (app) =>{
    // /////////////////////////////////////////////////////////                                             ///////////////////////////////////////////////////////// 
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES ANTONIO CARRANZA BARROSO /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////                                             /////////////////////////////////////////////////////////

//GET de todos los elementos
app.get(BASE_API_URL+"/jobs-companies-innovation-stats",(req,res)=>{
    res.json(dataACB);
    console.log("New GET request /jobs-companies-innovation-stats");
});
//GET loadInitial Data
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/loadInitialData",(req,res)=>{
    dataACB = acb.datos_ACB;
    res.json(dataACB);
    console.log("New GET request /jobs-companies-innovation-stats/loadInitialData");
});
//GET recurso especifico
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory",(req,res)=>{
    const territory = req.params.territory; // Obtener el parámetro de territorio de la URL
    const resource = dataACB.find(resource => resource.territory === territory); // Buscar el recurso por territorio

    if (resource) {
        res.json(resource); // Devolver el recurso con una respuesta HTTP 200
    } else {
        res.status(404).json({error: "Recurso no encontrado"}); // Devolver un error HTTP 404 si no se encuentra el recurso
    }
});

//POST exitoso /*
app.post(BASE_API_URL + "/jobs-companies-innovation-stats", (request, response) => {
    const newStat = request.body;
     // Comprobar que el objeto JSON tiene los campos esperados
  if (!newStat.hasOwnProperty("territory") || !newStat.hasOwnProperty("year") || !newStat.hasOwnProperty("jobs_industry") || !newStat.hasOwnProperty("companies_with_innovations") || !newStat.hasOwnProperty("temporary_employment")) {
    response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" }); // Enviar una respuesta con el código 400 (Bad Request) si el objeto JSON no tiene los campos esperados
    return;
  }
    const conflictIndex = dataACB.findIndex(stat => stat.territory === newStat.territory && stat.year === newStat.year && stat.jobs_industry === newStat.jobs_industry
        && stat.companies_with_innovations === newStat.companies_with_innovations && stat.temporary_eployment === newStat.temporary_eployment) ;
  
    if (conflictIndex !== -1) {
      response.status(409).send({ error: "Ya existe un elemento con los mismos datos" });
    } else {
      dataACB.push(newStat);
      response.sendStatus(201); // Creado correctamente
      console.log("Nuevo post /jobs-companies-innovation-stats");
    }
  });
  
//POST FALLIDO
app.post(BASE_API_URL+"/jobs-companies-innovation-stats/:year",(req,res)=>{
    res.sendStatus(405, "Method not allowed");
    console.log("New post /jobs-companies-innovation-stats/:year");
});


//DELETE  del array de recursos 
app.delete(BASE_API_URL+"/jobs-companies-innovation-stats", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        dataACB = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        if (dataACB.length == 0) { // Si el objeto no se encuentra devuelve 404    
            response.status(404).send("El objeto no existe");
        }
    }
    console.log("Se ha borrado /jobs-companies-innovation-stats");
});

//DELETE  DE UN RECURSO
app.delete(BASE_API_URL + "/jobs-companies-innovation-stats/:territory", (request, response) => {
    const territory = request.params.territory;
    const index = dataACB.findIndex(item => item.territory === territory); // Encontrar el índice del elemento a eliminar
    if (index !== -1) { // Comprobar si se encontró el elemento
      dataACB.splice(index, 1); // Eliminar el elemento en el índice encontrado
      response.status(204).send("Se ha eliminado correctamente"); // Enviar una respuesta vacía con el código 204 (No Content) para indicar éxito sin contenido
    } else {
      response.status(404).send({ error: "No se encontró el elemento con el territorio especificado" }); // Enviar una respuesta con el código 404 (Not Found) si el elemento no se encontró
    }
  });
// PUT actualizar recurso existente
app.put(BASE_API_URL + "/jobs-companies-innovation-stats/:territory", (request, response) => {
    const territory = request.params.territory; // Obtener el territorio de la URL
    const updatedStat = request.body; // Obtener los nuevos datos del cuerpo de la solicitud
    if (!updatedStat.hasOwnProperty("territory")) { // Comprobar si el cuerpo de la solicitud contiene el campo "territory"
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }
    if (territory !== updatedStat.territory) { // Comprobar si el "territory" de la URL es igual al "territory" del cuerpo de la solicitud
        response.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
        return;
    }
    const index = dataACB.findIndex(stat => stat.territory === territory); // Encontrar el índice del recurso a actualizar
    if (index !== -1) {
        dataACB[index] = updatedStat; // Actualizar el recurso en la posición encontrada
        response.sendStatus(204); // Enviar una respuesta vacía con código de estado 204 (Actualización exitosa)
        console.log("Recurso actualizado: " + territory);
    } else {
        response.status(404).send({ error: "Recurso no encontrado" }); // Si no se encuentra el recurso, devolver un código de estado 404
    }
});

  //PUT a lista de recursos
  app.put(BASE_API_URL + "/jobs-companies-innovation-stats",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});


}