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
app.get(BASE_API_URL+"/ict-promotion-strategy-stats",(req,res)=>{
    console.log("New GET request /ict-promotion-strategy-stats");

    //PRUEBA: http://localhost:12345/api/v1/ict-promotion-strategy-stats?offset=0&limit=5

    // Obtener offset y limit de los parámetros de la consulta, si están presentes
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 1000;

    dbCgm.find({})
    .sort({year: 1}) // ordenar por id en orden ascendente
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
app.get(BASE_API_URL+"/ict-promotion-strategy-stats/loadInitialData",(req,res)=>{
    dbCgm.insert(cgm.datos_cgm, (err, data) => {
        if (err) {
            console.log(`Error inserting data: ${err}`);
            res.sendStatus(500);
        } else {
            data.forEach((d) => delete d._id);
            res.json(data);
            console.log("New GET request /ict-promotion-strategy-stats/loadInitialData");
        }
    });
});

// //GET recurso especifico
// app.get(BASE_API_URL+"/ict-promotion-strategy-stats/:id",(req,res)=>{
//     const id = req.params.id; // URL: parámetro de id
//     console.log(id);
//     const resource = dataCGM.find(r => r.id == id); // busca el recurso por id
//     console.log(resource);
//     if (resource) {
//         res.json(resource); // Devolver recurso (respuesta HTTP 200)
//     } else {
//         res.status(404).json({error: "Recurso no encontrado"}); // Devolver error HTTP 404 si no encuentra recurso
//     }
// });

//POST añadir datos
app.post(BASE_API_URL + "/ict-promotion-strategy-stats", (request, response) => {
    const ns = request.body;
    // Check that the JSON object has the expected fields
    if (!ns.hasOwnProperty("territory") || !ns.hasOwnProperty("year") || !ns.hasOwnProperty("ict_manufacturing_industry") || !ns.hasOwnProperty("wholesale_trade") || !ns.hasOwnProperty("edition_of_computer_program")) 
    {
      response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" }); // Enviar una respuesta con el código 400 (Bad Request) si el objeto JSON no tiene los campos esperados
      return;
    }
    // Check if the same resource already exists in the database
    dbCgm.findOne({territory: ns.territory, year: ns.year, 
    ict_manufacturing_industry: ns.ict_manufacturing_industry, 
    wholesale_trade: ns.wholesale_trade, 
    edition_of_computer_program: ns.edition_of_computer_program }, (err, resource) => {
        
        if (err) {
            console.log(`Error getting resource ${newStat.year}: ${err}`);
            response.sendStatus(500);
        } else if (resource) {
            response.status(409).send({ error: "Ya existe un elemento con los mismos datos" });
        } else {
            dbCgm.insert(ns, (err, data) => {
                if (err) {
                    console.log(`Error inserting data: ${err}`);
                    response.sendStatus(500);
                } else {
                    response.sendStatus(201);
                    console.log("Nuevo post /ict-promotion-strategy-stats");
                }
            });
        }
    });
});

//POST fallo
app.post(BASE_API_URL+"/ict-promotion-strategy-stats/:territory",(req,res)=>{
    res.sendStatus(405, "Method not allowed"); // respuesta ERROR 405
    console.log("New post /ict-promotion-strategy-stats/:territory");
});

// DELETE array completo
app.delete(BASE_API_URL+"/ict-promotion-strategy-stats", (request, response) => {
    dbCgm.find({}, (err, docs) => {
        if (err) {
            console.log(`Error finding data: ${err}`);
            response.sendStatus(500);
        } else if (docs.length === 0) { // Comprobar si el array está vacío
            response.status(404).send("No se encontraron registros para borrar");
        } else {
            dbCgm.remove({}, { multi: true }, (err, numRemoved) => {
                if (err) {
                    console.log(`Error removing data: ${err}`);
                    response.sendStatus(500);
                } else {
                    response.status(200).send(`Se han borrado ${numRemoved} registros correctamente`);
                    console.log("Se ha borrado /jobs-companies-innovation-stats");
                }
            });
        }
    });
});

// DELETE DE UN RECURSO
app.delete(BASE_API_URL + "/ict-promotion-strategy-stats/:year", (request, response) => {
    const year = parseInt(request.params.year);
    dbCgm.remove({ year: year }, {}, (err, numRemoved) => {
        console.log(numRemoved);
        if (err) {
            console.log(`Error removing data: ${err}`);
            response.sendStatus(500);
        } else if (numRemoved == 0) {
            response.status(404).send({ error: "No se encontró el elemento con la year especificada" });
        } else {
            response.status(204).send(`El recurso con year ${year} ha sido eliminado correctamente`);
            console.log(`Se ha eliminado el recurso con year: ${year}`);
        }
    });
});

// PUT actualizar recurso existente
app.put(BASE_API_URL + "/ict-promotion-strategy-stats/:year", (request, response) => {
    const year = parseInt(request.params.year);
    const updatedStat = request.body;
    console.log("tamos aki");

    // Comprobar si no tiene todos los campos requeridos
    if (!updatedStat.hasOwnProperty("territory") || !updatedStat.hasOwnProperty("year") 
    || !updatedStat.hasOwnProperty("ict_manufacturing_industry") || !updatedStat.hasOwnProperty("wholesale_trade") 
    || !updatedStat.hasOwnProperty("edition_of_computer_program"))
    {
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }

    if (year !== updatedStat.year) { // Comprobar si el "year" de la URL es igual al "year" del cuerpo de la solicitud
        response.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
        return;
    }

    dbCgm.update({ year: year }, updatedStat, {}, (err, numReplaced) => {
        console.log(numReplaced);
        if (err) {
            console.log(`Error updating resource ${year}: ${err}`);
            response.sendStatus(500);
        } else if (numReplaced == 0) {
            response.status(404).send({ error: "Recurso no encontrado" });
        } else {
            response.sendStatus(204);
            console.log("Recurso actualizado: " + year);
        }
    });
});


  //PUT a lista de recursos
  app.put(BASE_API_URL + "/ict-promotion-strategy-stats",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});

app.get(BASE_API_URL + "/ict-promotion-strategy-stats/docs", (req, res) => {
    console.log("New GET request to /ict-promotion-strategy-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/26062709/2s93JzN1rf");
});

//Buscar por x recusrso
app.get(BASE_API_URL + "/ict-promotion-strategy-stats/search", (req, res) => {
    console.log("New GET request to /ict-promotion-strategy-stats/search");

    const query = req.query;
    const searchQuery = {};

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            if (key === "territory") {
                searchQuery[key] = query[key];
            }
            if (key === "year" || key === "id") {
                searchQuery[key] = parseInt(query[key]);
            } 
            else if (key === "ict_manufacturing_industry" || key === "wholesale_trade" || key === "edition_of_computer_program") {
                searchQuery[key] = parseFloat(query[key]);
            } 
            else {
                searchQuery[key] = new RegExp(query[key], "i");
            }
        }
    }

    dbCgm.find(searchQuery, (err, jobs) => {
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

}
