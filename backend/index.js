var express = require('express');
var acb = require("../backend/index-ACB");
var cgm = require("../backend/index-CGM");
var bodyParser = require("body-parser");
const backend = require('../backend');
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v1";
var dataACB = [];
var dataStore = require("nedb");
var dbAcb = new dataStore();
dbAcb.insert(dataACB);

var dataCGM = [];
var dbCgm = new dataStore();
dbCgm.insert(dataCGM);

module.exports = (app) =>{
    // /////////////////////////////////////////////////////////                                             ///////////////////////////////////////////////////////// 
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES ANTONIO CARRANZA BARROSO /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////             
app.use(bodyParser.json());                                /////////////////////////////////////////////////////////

//GET de todos los elementos
app.get(BASE_API_URL+"/jobs-companies-innovation-stats", (req, res) => {
    console.log("New GET request /jobs-companies-innovation-stats");

    // Obtener offset y limit de los parámetros de la consulta, si están presentes
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    dbAcb.find({})
         .skip(offset)
         .limit(limit)
         .exec((err, jobs) => {
            if (err) {
                console.log(`Error getting /jobs: ${err}`);
                res.sendStatus(500);
            } else {
                res.json(jobs.map((j) => {
                    delete j._id;
                    return j;
                }));
            }
        });
});

//GET loadInitial Data
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/loadInitialData",(req,res)=>{
    dbAcb.insert(acb.datos_ACB, (err, data) => {
        if (err) {
            console.log(`Error inserting data: ${err}`);
            res.sendStatus(500);
        } else {
            data.forEach((d) => delete d._id);
            res.json(data);
            console.log("New GET request /jobs-companies-innovation-stats/loadInitialData");
        }
    });
});

/*

app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory",(req,res)=>{
    const territory = req.params.territory;
    dbAcb.findOne({territory: territory}, (err, resource) => {
        if (err) {
            console.log(`Error getting resource ${territory}: ${err}`);
            res.sendStatus(500);
        } else if (resource) {
            delete resource._id;
            res.json(resource);
            console.log(`New GET request /jobs-companies-innovation-stats/${territory}`);
        } else {
            res.status(404).json({error: "Recurso no encontrado"});
        }
    });
});*/

app.post(BASE_API_URL + "/jobs-companies-innovation-stats", (request, response) => {
    const newStat = request.body;
    // Check that the JSON object has the expected fields
    if (!newStat.hasOwnProperty("territory") || !newStat.hasOwnProperty("year") || !newStat.hasOwnProperty("jobs_industry") || !newStat.hasOwnProperty("companies_with_innovations") || !newStat.hasOwnProperty("temporary_employment")) {
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }
    // Check if the same resource already exists in the database
    dbAcb.findOne({ territory: newStat.territory, year: newStat.year, jobs_industry: newStat.jobs_industry, companies_with_innovations: newStat.companies_with_innovations, temporary_employment: newStat.temporary_employment }, (err, resource) => {
        if (err) {
            console.log(`Error getting resource ${newStat.territory}: ${err}`);
            response.sendStatus(500);
        } else if (resource) {
            response.status(409).send({ error: "Ya existe un elemento con los mismos datos" });
        } else {
            dbAcb.insert(newStat, (err, data) => {
                if (err) {
                    console.log(`Error inserting data: ${err}`);
                    response.sendStatus(500);
                } else {
                    response.sendStatus(201);
                    console.log("Nuevo post /jobs-companies-innovation-stats");
                }
            });
        }
    });
});

  
//POST FALLIDO
app.post(BASE_API_URL+"/jobs-companies-innovation-stats/:year",(req,res)=>{
    res.sendStatus(405, "Method not allowed");
    console.log("New post /jobs-companies-innovation-stats/:year");
});



app.delete(BASE_API_URL+"/jobs-companies-innovation-stats", (request, response) => {
    dbAcb.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            console.log(`Error removing data: ${err}`);
            response.sendStatus(500);
        } else {
            response.status(200).send(`Se han borrado ${numRemoved} registros correctamente`);
            console.log("Se ha borrado /jobs-companies-innovation-stats");
        }
    });
});

// DELETE DE UN RECURSO
app.delete(BASE_API_URL + "/jobs-companies-innovation-stats/:territory", (request, response) => {
    const territory = request.params.territory;
    dbAcb.remove({ territory: territory }, {}, (err, numRemoved) => {
        if (err) {
            console.log(`Error removing data: ${err}`);
            response.sendStatus(500);
        } else if (numRemoved === 0) {
            response.status(404).send({ error: "No se encontró el elemento con el territorio especificado" });
        } else {
            response.status(204).send(`El recurso con territorio ${territory} ha sido eliminado correctamente`);
            console.log(`Se ha eliminado el recurso con territorio: ${territory}`);
        }
    });
});



// PUT actualizar recurso existente
app.put(BASE_API_URL + "/jobs-companies-innovation-stats/:territory", (request, response) => {
    const territory = request.params.territory; // Obtener el territorio de la URL
    const updatedStat = request.body; // Obtener los nuevos datos del cuerpo de la solicitud

    // Comprobar si el cuerpo de la solicitud contiene todos los campos requeridos
    if (!updatedStat.hasOwnProperty("territory") || !updatedStat.hasOwnProperty("year") || !updatedStat.hasOwnProperty("jobs_industry") || !updatedStat.hasOwnProperty("companies_with_innovations") || !updatedStat.hasOwnProperty("temporary_employment")) {
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }

    if (territory !== updatedStat.territory) { // Comprobar si el "territory" de la URL es igual al "territory" del cuerpo de la solicitud
        response.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
        return;
    }

    dbAcb.update({ territory: territory }, updatedStat, {}, (err, numReplaced) => {
        if (err) {
            console.log(`Error updating resource ${territory}: ${err}`);
            response.sendStatus(500);
        } else if (numReplaced === 0) {
            response.status(404).send({ error: "Recurso no encontrado" });
        } else {
            response.sendStatus(204);
            console.log("Recurso actualizado: " + territory);
        }
    });
});


  //PUT a lista de recursos
  app.put(BASE_API_URL + "/jobs-companies-innovation-stats",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});


app.get(BASE_API_URL + "/jobs-companies-innovation-stats/search", (req, res) => {
    console.log("New GET request to /jobs-companies-innovation-stats/search");

    const query = req.query;
    const searchQuery = {};

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            if (key === "year") {
                searchQuery[key] = parseInt(query[key]);
            } else if (key === "jobs_industry") {
                searchQuery[key] = parseInt(query[key]);
            } else if (key === "companies_with_innovations" || key === "temporary_employment") {
                searchQuery[key] = parseFloat(query[key]);
            } else {
                searchQuery[key] = new RegExp(query[key], "i");
            }
        }
    }

    dbAcb.find(searchQuery, (err, jobs) => {
        if (err) {
            console.log(`Error getting /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            if (jobs.length === 0) {
                res.status(404).json({error: "No se encontraron resultados para la búsqueda"});
            } else {
                res.json(jobs.map((j) => {
                    delete j._id;
                    return j;
                }));
            }
        }
    });
});
app.get(BASE_API_URL + "/jobs-companies-innovation-stats/docs", (req, res) => {
    console.log("New GET request to /jobs-companies-innovation-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/14969056/2s93JzN1Yu");
});

  


// /////////////////////////////////////////////////////////                                       //////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES CARLOS GATA MASERO //////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////                                       //////////////////////////////////////////////////////////

//GET de todos los elementos
app.get(BASE_API_URL+"/ICT-promotion-strategy-stats",(req,res)=>{
    res.json(dataCGM);
    console.log("New GET request /ICT-promotion-strategy-stats");
});

//GET loadInitialData
app.get(BASE_API_URL+"/ICT-promotion-strategy-stats/loadInitialData",(req,res)=>{
    dataCGM = cgm.datos_cgm;
    res.json(dataCGM);
    console.log(cgm.datos_cgm);
    console.log("New GET request /ICT-promotion-strategy-stats/loadInitialData");
});

//GET recurso especifico
app.get(BASE_API_URL+"/ICT-promotion-strategy-stats/:id",(req,res)=>{
    const id = req.params.id; // URL: parámetro de id
    console.log(id);
    const resource = dataCGM.find(r => r.id == id); // busca el recurso por id
    console.log(resource);
    if (resource) {
        res.json(resource); // Devolver recurso (respuesta HTTP 200)
    } else {
        res.status(404).json({error: "Recurso no encontrado"}); // Devolver error HTTP 404 si no encuentra recurso
    }
});

//POST ok
app.post(BASE_API_URL + "/ICT-promotion-strategy-stats", (request, response) => {
    const ns = request.body;
   // response.sendStatus(201); // Objeto creado ok
     // Comprueba que el JSON tiene los campos correctos
  if (!ns.hasOwnProperty("id") || !ns.hasOwnProperty("territory") || !ns.hasOwnProperty("year") || !ns.hasOwnProperty("ICT_manufacturing_industry") || !ns.hasOwnProperty("wholesale_trade") || !ns.hasOwnProperty("edition_of_computer_program")) 
  {
    response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" }); // Enviar una respuesta con el código 400 (Bad Request) si el objeto JSON no tiene los campos esperados
    return;
  }
    const conflictIndex = dataCGM.findIndex(stat => stat.id == ns.id 
                                                 && stat.territory === ns.territory 
                                                 && stat.year === ns.year 
                                                 && stat.ICT_manufacturing_industry === ns.ICT_manufacturing_industry
                                                 && stat.wholesale_trade === ns.wholesale_trade 
                                                 && stat.edition_of_computer_program === ns.edition_of_computer_program) ;
  
    if (conflictIndex !== -1) {
      response.status(409).send({ error: "Ya existe un elemento con los mismos datos" }); // ERROR, ya existe un objeto con esos datos
      console.log("Error: Ya existe un elemento con los mismos datos");
    } else {
      dataCGM.push(ns);
      response.sendStatus(201); // Objeto creado ok
      console.log("Nuevo post /ICT-promotion-strategy-stats");
    }
  });

//POST fallo
app.post(BASE_API_URL+"/ICT-promotion-strategy-stats/:year",(req,res)=>{
    res.sendStatus(405, "Method not allowed"); // respuesta ERROR 405
    console.log("New post /ICT-promotion-strategy-stats/:year");
});

//DELETE  array completo
app.delete(BASE_API_URL+"/ICT-promotion-strategy-stats", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        dataCGM = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        if (dataCGM.length == 0) { // si no encuentra el Objeto -> error 404 ya que el objeto no existe  
            response.status(404).send("El objeto no existe");
        }
    }
    console.log("Se ha borrado /ICT-promotion-strategy-stats");
});

//DELETE  DE UN RECURSO
app.delete(BASE_API_URL + "/ICT-promotion-strategy-stats/:id", (request, response) => {
    const id = request.params.id;
    const indice = dataCGM.findIndex(i => i.id == id); // Encontrar el índice del elemento a eliminar
    if (indice !== -1) { // Si encuentra el elemento segun el indice, lo elimina y envia una respuesta + 204 (No Content)
      dataCGM.splice(indice, 1);
      response.status(204).send("Se ha eliminado correctamente el objeto con id= "+id);
      console.log(id+" eliminado correctamente");
    } else { // respuesta + código 404 (Not Found) si no encuentra el elemento
      response.status(404).send({ error: "No se encontró el elemento con el territorio especificado" });
    }
  });

// PUT actualizar recurso existente
app.put(BASE_API_URL + "/ICT-promotion-strategy-stats/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const upd_s = request.body;
    
    if (!upd_s.hasOwnProperty("id")) { // Comprobar si el cuerpo de la solicitud contiene el campo "id"
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }
    console.log(upd_s);
    if (id !== upd_s.id) { // Comprobar si el "id" de la URL es igual al "id" de la solicitud
        response.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
        return;
    }
    const indice = dataCGM.findIndex(stat => stat.id == id); // Encontrar el índice del recurso a actualizar
    console.log(indice);
    if (indice != -1) {
        dataCGM[indice] = upd_s; // Actualizar recurso
        response.sendStatus(204); // Enviar respuesta actualización exitosa
        console.log("Recurso actualizado: " + id);
    } else {
        response.status(404).send({ error: "Recurso no encontrado" }); // Si no se encuentra el recurso, devolver un código de estado 404
    }
});

  //PUT a lista de recursos
  app.put(BASE_API_URL + "/ICT-promotion-strategy-stats",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});


}
