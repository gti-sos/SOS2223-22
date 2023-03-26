var express = require('express');
var acb = require("../backend/index-ACB");
var bodyParser = require("body-parser");
const backend = require('../backend');
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v1";
var dataACB = [];
var dataStore = require("nedb");
var dbAcb = new dataStore();
dbAcb.insert(dataACB);

const cgmFilePath = 'ddbb/stats-cgm.json';
const fs = require('fs');
var Datastore = require('nedb'), cgm = new Datastore();


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
//GET de elementos filtrados por territorio
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory", (req, res) => {
    console.log("New GET request /jobs-companies-innovation-stats with filter territory");

    // Obtener el parámetro de la consulta
    const territory = req.params.territory;

    // Construir el objeto de filtro
    const filter = {};
    if (territory) filter.territory = territory;

    // Realizar la consulta a la base de datos
    dbAcb.find(filter, (err, jobs) => {
        if (err) {
            console.log(`Error getting filtered /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            res.json(jobs.map((j) => {
                delete j._id;
                return j;
            }));
        }
    });
});
//GET de elementos filtrados por territorio y año
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory/:year", (req, res) => {
    console.log("New GET request /jobs-companies-innovation-stats with filter territory and year");

    // Obtener los parámetros de la consulta
    const territory = req.params.territory;
    const year = parseInt(req.params.year);

    // Validar que el valor de year sea un número entero válido
    if (isNaN(year)) {
        res.status(400).json({ error: "El valor de year no es válido" });
        return;
    }

    // Construir el objeto de filtro
    const filter = {};
    if (territory) filter.territory = territory;
    filter.year = year;

    // Realizar la consulta a la base de datos
    dbAcb.find(filter, (err, jobs) => {
        if (err) {
            console.log(`Error getting filtered /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            res.json(jobs.map((j) => {
                delete j._id;
                return j;
            }));
        }
    });
});

//GET de elementos filtrados por territorio, año y empleos en la industria

app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory/:year/:jobs_industry", (req, res) => {
    console.log("New GET request /jobs-companies-innovation-stats with filter territory, year and jobs_industry");

    // Obtener los parámetros de la consulta
    const territory = req.params.territory;
    const year = parseInt(req.params.year);
    const jobs_industry = parseInt(req.params.jobs_industry);

    // Construir el objeto de filtro
    const filter = {};
    if (territory) filter.territory = territory;
    if (year) filter.year = year;
    if (jobs_industry) filter.jobs_industry = jobs_industry;

    // Realizar la consulta a la base de datos
    dbAcb.find(filter, (err, jobs) => {
        if (err) {
            console.log(`Error getting filtered /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            res.json(jobs.map((j) => {
                delete j._id;
                return j;
            }));
        }
    });
});

//GET de elementos filtrados por territorio, año, empleos en la industria y empresas con innovaciones
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory/:year/:jobs_industry/:companies_with_innovations", (req, res) => {
    console.log("New GET request /jobs-companies-innovation-stats with filter territory, year, jobs_industry and companies_with_innovations");

    // Obtener los parámetros de la consulta
    const territory = req.params.territory;
    const year = parseInt(req.params.year);
    const jobs_industry = parseInt(req.params.jobs_industry);
    const companies_with_innovations = parseInt(req.params.companies_with_innovations);

    // Construir el objeto de filtro
    const filter = {};
    if (territory) filter.territory = territory;
    if (year) filter.year = year;
    if (jobs_industry) filter.jobs_industry = jobs_industry;
    if (companies_with_innovations) filter.companies_with_innovations = companies_with_innovations;

    // Realizar la consulta a la base de datos
    dbAcb.find(filter, (err, jobs) => {
        if (err) {
            console.log(`Error getting filtered /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            res.json(jobs.map((j) => {
                delete j._id;
                return j;
            }));
        }
    });
});

//GET de elementos filtrados por territorio, año, empleos en la industria, empresas con innovaciones y empleos temporales
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/:territory/:year/:jobs_industry/:companies_with_innovations/:temporary_employment", (req, res) => {
    console.log("New GET request /jobs-companies-innovation-stats with filter territory, year, jobs_industry, companies_with_innovations and temporary_employment");

    // Obtener los parámetros de la consulta
    const territory = req.params.territory;
    const year = parseInt(req.params.year);
    const jobsIndustry = parseInt(req.params.jobs_industry);
    const companiesWithInnovations = parseInt(req.params.companies_with_innovations);
    const temporaryEmployment = parseFloat(req.params.temporary_employment);

    // Validar que los valores recibidos sean números válidos
    if (isNaN(year) || isNaN(jobsIndustry) || isNaN(companiesWithInnovations) || isNaN(temporaryEmployment)) {
        res.status(400).json({ error: "Uno o más valores no son válidos" });
        return;
    }

    // Construir el objeto de filtro
    const filter = {};
    if (territory) filter.territory = territory;
    filter.year = year;
    filter.jobs_industry = jobsIndustry;
    filter.companies_with_innovations = companiesWithInnovations;
    filter.temporary_employment = temporaryEmployment;

    // Realizar la consulta a la base de datos
    dbAcb.find(filter, (err, jobs) => {
        if (err) {
            console.log(`Error getting filtered /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            res.json(jobs.map((j) => {
                delete j._id;
                return j;
            }));
        }
    });
});


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


app.get(BASE_API_URL + "/jobs-companies-innovation-stats/", (req, res) => {
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

// Redirect
app.get(BASE_API_URL + "/ict-promotion-strategy-stats/docs", (req, res) => {
    console.log("New GET request to /ict-promotion-strategy-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/26062709/2s93RNzFC5");
});


//GET loadInitial Data
app.get(BASE_API_URL+"/ict-promotion-strategy-stats/loadInitialData",(req,res)=>{
    cgm.find({}, (err, docs) => {
        if (err) {
          console.log(`Error getting /ict-promotion-strategy-stats: ${err}`);
          res.sendStatus(500);
        } else if (docs.length === 0) {
          const fs = require('fs');
          const cgmData = JSON.parse(fs.readFileSync(cgmFilePath));
          const initialcgm = cgmData;
          cgm.insert(initialcgm, (err, newDocs) => {
            if (err) {
              console.log(`Error inserting initial data into ict-promotion-strategy-stats: ${err}`);
              res.sendStatus(500);
            } else {
              console.log(`Inserted ${newDocs.length} initial ict-promotion-strategy-stats`);
              res.sendStatus(200);
            }
          });
        } else {
          console.log(`cgm collection already has ${docs.length} documents`);
          res.sendStatus(200);
        }
      });
});

//GET recurso especifico
app.get(BASE_API_URL+"/ict-promotion-strategy-stats",(req,res)=>{
    const { year, territory, ict_manufacturing_industry, wholesale_trade, edition_of_computer_program, limit = 10000, offset = 0 } = req.query;
    const query = {};

    if (year) {
        query.year = parseInt(year);
    }
    if (territory) {
        query.territory = { $regex: new RegExp(territory, 'i') };   
    }
    if (ict_manufacturing_industry) {
        query.ict_manufacturing_industry = parseFloat(ict_manufacturing_industry);
    }
    if (wholesale_trade) {
        query.wholesale_trade = parseFloat(wholesale_trade);
    }
    if (edition_of_computer_program) {
        query.edition_of_computer_program = parseFloat(edition_of_computer_program);
    }
    const limitValue = parseInt(limit);
    const offsetValue = parseInt(offset);
    cgm
        .find(query)
        .sort({year: 1}) // ordenar por id en orden ascendente
        .limit(limitValue)
        .skip(offsetValue)
        .exec((err, cgm) => {
        if (err) {
            console.log(`No cgm found: ${err}`);
            res.sendStatus(404);
        } else {
            console.log(`cgm returned = ${cgm.length}`);
            res.json(cgm.map((j) => {
                delete j._id;
                return j;
            }));
        }
    });
});

// GET busqueda por values

app.get('/api/v1/ICT-promotion-strategy-stats/:value/:value2?', (req, res) => {
    const { value, value2 } = req.params;
    console.log(value);
    const query = { $where: function() {
      const keys = Object.keys(this);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof this[key] === 'number' && parseFloat(value) === this[key]) {
          return true;
        } else if (typeof this[key] === 'string' && this[key].toLowerCase().includes(value.toLowerCase())) {
          if (value2) {
            const nextKey = keys[i + 1];
            if (nextKey && typeof this[nextKey] === 'number' && parseInt(value2) === this[nextKey]) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
      return false;
    }};
    cgm.find(query, (err, cgm) => {
      if (err) {
        console.log(`Error getting /cgm: ${err}`);
        res.sendStatus(500);
      } else if (cgm.length === 0) {
        res.status(404).json({ error: 'cgm not found.' });
      } else {
        console.log(`cgm returned = ${cgm.length}`)
        res.json(cgm.map((j) => {
            delete j._id;
            return j;
        }));
      }
    });
  });
  
      
//POST añadir datos
app.post(BASE_API_URL + "/ict-promotion-strategy-stats", (req, res) => {
    const ns = req.body;

    if (!ns.year || !ns.territory || !ns.ict_manufacturing_industry || !ns.wholesale_trade || !ns.edition_of_computer_program) {
      return res.status(400).json({ error: 'Faltan datos en el JSON' });
    }
    // Check if the same resource already exists in the database
    cgm.findOne({territory: ns.territory, year: ns.year, 
    ict_manufacturing_industry: ns.ict_manufacturing_industry, 
    wholesale_trade: ns.wholesale_trade, 
    edition_of_computer_program: ns.edition_of_computer_program }, (err, resource) => {
        
        if (err) {
            console.log(`Error getting resource ${ns.year}: ${err}`);
            res.sendStatus(500);
        } else if (resource) {
            res.status(409).send({ error: "Ya existe un elemento con los mismos datos" });
        } else {
            cgm.insert(ns, (err, data) => {
                if (err) {
                    console.log(`Error inserting data: ${err}`);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                    console.log("Nuevo post /ict-promotion-strategy-stats");
                }
            });
        }
    });
});

//POST fallo
app.post(BASE_API_URL+"/ict-promotion-strategy-stats/*",(req,res)=>{
    res.sendStatus(405, "Method not allowed"); // respuesta ERROR 405
});

//DELETE  array completo
app.delete(BASE_API_URL+"/ict-promotion-strategy-stats", (req, res) => {
    cgm.remove({}, { multi: true }, (err, numRemoved) => {
      if (err) {
          console.error(err);
          return res.status(500).send({ error: 'Internal server error' });
      }
      return res.status(200).send({ message: `Deleted ${numRemoved} itc stats` });
  });
  });
  
  //DELETE  DE UN RECURSO
  app.delete(BASE_API_URL + "/ict-promotion-strategy-stats/:year", (req, res) => {
    const bd_year = Number(req.params.year);
  cgm.remove({ year: bd_year }, {}, (err, numRemoved) => {
      if (err) {
          console.error(err);
          return res.status(500).send({ error: 'Internal server error' });
      }
      if (numRemoved === 0) {
          return res.status(400).send({ error: 'Bad request: Blood donation parameter not found' });
      }
      return res.status(200).send({ message: 'Blood donation deleted successfully' });
  });
});

// PUT fallido
app.put(BASE_API_URL + "/ict-promotion-strategy-stats", (req, res) => {
    res.sendStatus(405);
});
  
//PUT a lista de recursos
app.put(BASE_API_URL + "/ict-promotion-strategy-stats/:year",(req,res)=>{
    const bd_year = Number(req.params.year); // Obtener el ID de la URL
    const updatedBd = req.body; // Obtener ict actualizado desde cuerpo 

    // Actualizar el objeto ict en la base de datos
    cgm.update({ year: bd_year }, { $set: updatedBd }, {}, (err, numReplaced) => {
    if (err) {
        console.error(err);
        return res.status(500).send({ error: 'Internal server error' });
    }
    if (numReplaced === 0) {
        return res.status(400).send({ error: 'Bad request: ict stats ID not found' });
    }
    return res.status(200).send({ message: 'ict stats updated successfully' });
    });
});

}
