import express from "express";
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v2";
import dataStore from "nedb";
var dbAcb = new dataStore();
const portt = 3000; // Elige el puerto en el que se ejecutará tu servidor proxy



var acb = [
    {
     territory: "andalucia",
     year: 2008,
     jobs_industry: 345542,
     companies_with_innovations: 95,
     temporary_employment: 41.10
    },
    {
     territory: "españa",
     year: 2009,
     jobs_industry: 3067500,
     companies_with_innovations: "1.605",
     temporary_employment: 25.13
    },

    
    {
     territory: "union europea 28",
     year: 2008,
     jobs_industry: 35687400,
     companies_with_innovations: 0,
     temporary_employment: 13.22        
    },
    {
     territory: "union europea 15",
     year: 2008,
     jobs_industry: 28523400,
     companies_with_innovations: 0,
     temporary_employment: 13.03
    },
     {territory: 'españa', 
     year: 2000, 
     jobs_industry: 5955540.51, 
     companies_with_innovations: 964.389, 
     temporary_employment: 6.9},

      
{territory: 'españa', year: 2001, jobs_industry: 1866887.92, companies_with_innovations: 1681.607, temporary_employment: 36.13},

{territory: 'españa', year: 2002, jobs_industry: 9194659.52, companies_with_innovations: 43.603, temporary_employment: 30.03},
{territory: 'españa', year: 2003, jobs_industry: 3051773.91, companies_with_innovations: 531.177, temporary_employment: 27.4},
{territory: 'españa', year: 2004, jobs_industry: 9301223.88, companies_with_innovations: 1524.428, temporary_employment: 1.2},
{territory: 'españa', year: 2005, jobs_industry: 9929402.39, companies_with_innovations: 1291.103, temporary_employment: 46.35},
{territory: 'españa', year: 2006, jobs_industry: 4382533.86, companies_with_innovations: 1384.308, temporary_employment: 44.36},
{territory: 'españa', year: 2007, jobs_industry: 2760103, companies_with_innovations: 901.766, temporary_employment: 40.2},
{territory: 'españa', year: 2008, jobs_industry: 109945.01, companies_with_innovations: 161.655, temporary_employment: 17.05},
{territory: 'españa', year: 2009, jobs_industry: 3124132.9, companies_with_innovations: 1503.918, temporary_employment: 21.55},
{territory: 'españa', year: 2010, jobs_industry: 3645837.25, companies_with_innovations: 140.568, temporary_employment: 0.58},
{territory: 'españa', year: 2011, jobs_industry: 1782865.3, companies_with_innovations: 774.476, temporary_employment: 14.97},
{territory: 'españa', year: 2012, jobs_industry: 1708455.22, companies_with_innovations: 1599.842, temporary_employment: 45.37},
{territory: 'españa', year: 2013, jobs_industry: 9824335.98, companies_with_innovations: 1703.845, temporary_employment: 8.88},
{territory: 'españa', year: 2014, jobs_industry: 5495764.51, companies_with_innovations: 349.914, temporary_employment: 13.25},
{territory: 'españa', year: 2015, jobs_industry: 5757685.39, companies_with_innovations: 871.838, temporary_employment: 36.74},
{territory: 'españa', year: 2016, jobs_industry: 5508138.44, companies_with_innovations: 1717.129, temporary_employment: 20.33},
{territory: 'españa', year: 2017, jobs_industry: 4375942.26, companies_with_innovations: 1656.376, temporary_employment: 28.53}, 
{territory: 'españa', year: 2018, jobs_industry: 5717043.63, companies_with_innovations: 828.954, temporary_employment: 25.19},
{territory: 'españa', year: 2019, jobs_industry: 4703434.97, companies_with_innovations: 926.089, temporary_employment: 49.31},
{territory: 'españa', year: 2020, jobs_industry: 2711264.76, companies_with_innovations: 1401.067, temporary_employment: 32.77},
{territory: 'españa', year: 2021, jobs_industry: 2645034.16, companies_with_innovations: 222.502, temporary_employment: 7.06},
{territory: 'españa', year: 2022, jobs_industry: 4059827.89, companies_with_innovations: 1850.767, temporary_employment: 31.48},
{territory: 'españa', year: 2023, jobs_industry: 9743494, companies_with_innovations: 1024.099, temporary_employment: 24.66},
    {
     territory: "Belgica",
     year: 2010,
     jobs_industry: 726100,
     companies_with_innovations: 0,
     temporary_employment: 9.42
    },
    {
     territory: "Bulgaria",
     year: 2010,
     jobs_industry: 459100,
     companies_with_innovations: 0,
     temporary_employment: 2.23
    },
    {
     territory: "Republica Checa",
     year: 2008,
     jobs_industry: 1026400,
     companies_with_innovations: 0,
     temporary_employment: 8.40
    },
    {
     territory: "Dinamarca",
     year: 2008,
     jobs_industry: 385500,
     companies_with_innovations: 0,
     temporary_employment: 5.86
    },
    {
     territory: "Alemania",
     year: 2008,
     jobs_industry: 7630300,
     companies_with_innovations: 0,
     temporary_employment: 12.65
    },
    {
     territory: "Estonia",
     year: 2008,
     jobs_industry: 88600,
     companies_with_innovations: 0,
     temporary_employment: 0
    },
    {
        territory: "Lituania",
        year: 2008,
        jobs_industry: 32,
        companies_with_innovations: 0,
        temporary_employment: 41.10
       },
       {
        territory: "Rumania",
        year: 2008,
        jobs_industry: 3221,
        companies_with_innovations: 89,
        temporary_employment: 21.10
       }, 
       {
        territory: "Luxemburgo",
        year: 2008,
        jobs_industry: 21,
        companies_with_innovations: 9,
        temporary_employment: 21.10
       },
       {
        territory: "Huelva",
        year: 2008,
        jobs_industry: 21111,
        companies_with_innovations: 235,
        temporary_employment: 2451.10
       },
       {
        territory: "Cancas",
        year: 2008,
        jobs_industry: 4566,
        companies_with_innovations: 21,
        temporary_employment: 41.10
       },
       {
        territory: "Portugal",
        year: 2008,
        jobs_industry: 999,
        companies_with_innovations:1345,
        temporary_employment: 35.10
       },
       {
        territory: "Italia",
        year: 2008,
        jobs_industry: 456,
        companies_with_innovations: 2355,
        temporary_employment: 41.10
       },{
        territory: "cataluña",
        year: 2008,
        jobs_industry: 274832,
        companies_with_innovations: 120,
        temporary_employment: 38.50
      },
      {
        territory: "madrid",
        year: 2008,
        jobs_industry: 415980,
        companies_with_innovations: 200,
        temporary_employment: 28.90
      },
      {
        territory: "francia",
        year: 2008,
        jobs_industry: 4132500,
        companies_with_innovations: 2100,
        temporary_employment: 16.40
      },
      {
        territory: "alemania",
        year: 2008,
        jobs_industry: 8207500,
        companies_with_innovations: 3500,
        temporary_employment: 11.30
      },
      {
        territory: "italia",
        year: 2008,
        jobs_industry: 2789000,
        companies_with_innovations: 1350,
        temporary_employment: 14.70
      },
      {
        territory: "portugal",
        year: 2008,
        jobs_industry: 625300,
        companies_with_innovations: 85,
        temporary_employment: 20.80
      },
      {
        territory: "reino unido",
        year: 2008,
        jobs_industry: 4972300,
        companies_with_innovations: 2400,
        temporary_employment: 12.50
      },{
        territory: "galicia",
        year: 2008,
        jobs_industry: 157890,
        companies_with_innovations: 55,
        temporary_employment: 35.20
      },
      {
        territory: "castilla y león",
        year: 2008,
        jobs_industry: 129500,
        companies_with_innovations: 80,
        temporary_employment: 32.40
      },
      {
        territory: "países bajos",
        year: 2008,
        jobs_industry: 1107800,
        companies_with_innovations: 500,
        temporary_employment: 9.10
      },
      {
        territory: "bélgica",
        year: 2008,
        jobs_industry: 845300,
        companies_with_innovations: 450,
        temporary_employment: 10.60
      },
      {
        territory: "suecia",
        year: 2008,
        jobs_industry: 1674300,
        companies_with_innovations: 750,
        temporary_employment: 8.80
      },
      {
        territory: "finlandia",
        year: 2008,
        jobs_industry: 583200,
        companies_with_innovations: 350,
        temporary_employment: 7.90
      },
      {
        territory: "dinamarca",
        year: 2008,
        jobs_industry: 839500,
        companies_with_innovations: 400,
        temporary_employment: 9.50
      },
      {
        territory: "austria",
        year: 2008,
        jobs_industry: 1427300,
        companies_with_innovations: 600,
        temporary_employment: 10.40
      }

   ];



function loadBackendAcb(app){
    // /////////////////////////////////////////////////////////                                             ///////////////////////////////////////////////////////// 
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES ANTONIO CARRANZA BARROSO /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////             
app.use(express.json());                                /////////////////////////////////////////////////////////

app.get("/api/v1" + "/jobs-companies-innovation-stats/docs", (req, res) => {
    console.log("New GET request to /jobs-companies-innovation-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/14969056/2s93JzN1Yu");
});
app.get(BASE_API_URL + "/jobs-companies-innovation-stats/docs", (req, res) => {
    console.log("New GET request to /jobs-companies-innovation-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/14969056/2s93Xtzjuj");
});

//PROXY
app.get('/api/v2/localentities', async (req, res) => {
    try {
      const url = 'https://sos2223-13.appspot.com/api/v2/localentities';
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
      console.log("Proxy realizado correctamente!");
    } catch (error) {
      console.log('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  app.listen(portt, () => {
    console.log(`Proxy server is running on port ${portt}`);
  });

 
  
//GET loadInitial Data
app.get(BASE_API_URL+"/jobs-companies-innovation-stats/loadInitialData",(req,res)=>{
    dbAcb.insert(acb, (err, data) => {
        if (err) {
            console.log(`Error inserting data: ${err}`);
            res.sendStatus(500);
        } 
        else {
        
            data.forEach((d) => delete d._id);
            res.json(data);
            console.log("New GET request /jobs-companies-innovation-stats/loadInitialData");
        }
    });
});
function handleDbResponseArray(err, jobs, res) {
    if (err) {
        console.log(`Error getting filtered /jobs: ${err}`);
        res.sendStatus(500);
    } else {
        if (jobs.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(jobs.map((j) => {
                delete j._id;
                return j;
            }));
        }
    }
}

// Función para manejar el resultado de las consultas a la base de datos
function handleDbResponse(err, jobs, res) {
    if (err) {
        console.log(`Error getting filtered /jobs: ${err}`);
        res.sendStatus(500);
    } else {
        if (jobs.length === 0) {
            res.sendStatus(404);
        } else {
            const job = jobs[0];
            delete job._id;
            res.json(job);
        }
    }
}

app.get(BASE_API_URL + "/jobs-companies-innovation-stats/", (req, res) => {
    console.log("New GET request to /jobs-companies-innovation-stats/search");

    const query = req.query;
    const searchQuery = {};

    // Pagination
    const offset = parseInt(query.offset) || 0;
    const limit = parseInt(query.limit) || 1000000;

    let queryCount = 0;

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            queryCount++;
            if (key === "year" || key === "year_min" || key === "year_max") {
                if (key === "year") {
                    searchQuery[key] = parseInt(query[key]);
                } else if (key === "year_min") {
                    searchQuery["year"] = {$gte: parseInt(query[key])};
                } else if (key === "year_max") {
                    searchQuery["year"] = {$lte: parseInt(query[key])};
                }
            } else if (key === "jobs_industry") {
                searchQuery[key] = parseInt(query[key]);
            } else if (key === "companies_with_innovations" || key === "temporary_employment") {
                searchQuery[key] = parseFloat(query[key]);
            } else if (key === "territory") {
                searchQuery[key] = new RegExp(query[key], "i");
            }
        }
    }

    dbAcb.find(searchQuery).skip(offset).limit(limit).exec((err, jobs) => {
        if (err) {
            console.log(`Error getting /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            if (jobs.length === 0) {
                res.status(404).json({error: "No se encontraron resultados para la búsqueda"});
            } else {
                if (queryCount >= 2 && jobs.length === 1) {
                    const job = jobs[0];
                    delete job._id;
                    res.json(job);
                } else {
                    res.json(jobs.map((j) => {
                        delete j._id;
                        return j;
                    }));
                }
            }
        }
    });
});


app.get(BASE_API_URL + "/jobs-companies-innovation-stats/:territory", (req, res) => {
    console.log(`New GET request to /jobs-companies-innovation-stats/${req.params.territory}`);
    const searchQuery = { territory: req.params.territory };
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

app.get(BASE_API_URL + "/jobs-companies-innovation-stats/:territory/:year", (req, res) => {
    console.log(`New GET request to /jobs-companies-innovation-stats/${req.params.territory}/${req.params.year}`);

    const territory = req.params.territory;
    const year = parseInt(req.params.year);

    dbAcb.find({territory: territory, year: year}).exec((err, jobs) => {
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
app.get(BASE_API_URL + "/jobs-companies-innovation-stats/:territory/:year/:jobs_industry", (req, res) => {
    const territory = req.params.territory;
    const year = parseInt(req.params.year);
    const jobs_industry = parseInt(req.params.jobs_industry);

    dbAcb.find({ territory: territory, year: year, jobs_industry: jobs_industry }, (err, jobs) => {
        if (err) {
            console.log(`Error getting /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            if (jobs.length === 0) {
                res.status(404).json({ error: "No se encontraron resultados para la búsqueda" });
            } else {
                const job = jobs[0];
                delete job._id;
                res.json(job);
            }
        }
    });
});

app.get(BASE_API_URL + "/jobs-companies-innovation-stats/:territory/:year/:jobs_industry/:companies_with_innovations", (req, res) => {
    const territory = req.params.territory;
    const year = parseInt(req.params.year);
    const jobsIndustry = parseInt(req.params.jobs_industry);
    const companiesWithInnovations = parseFloat(req.params.companies_with_innovations);
   
    dbAcb.find({ territory: territory, year: year, jobs_industry: jobsIndustry, companies_with_innovations: companiesWithInnovations,  }, (err, jobs) => {
        if (err) {
            console.log(`Error getting /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            if (jobs.length === 0) {
                res.status(404).json({error: "No se encontraron resultados para la búsqueda"});
            } else {
                const job = jobs[0];
                delete job._id;
                res.json(job);
            }
        }
    });
});

app.get(BASE_API_URL + "/jobs-companies-innovation-stats/:territory/:year/:jobs_industry/:companies_with_innovations/:temporary_employment", (req, res) => {
    const territory = req.params.territory;
    const year = parseInt(req.params.year);
    const jobsIndustry = parseInt(req.params.jobs_industry);
    const companiesWithInnovations = parseFloat(req.params.companies_with_innovations);
    const temporaryEmployment = parseFloat(req.params.temporary_employment);

    dbAcb.find({ territory: territory, year: year, jobs_industry: jobsIndustry, companies_with_innovations: companiesWithInnovations, temporary_employment: temporaryEmployment }, (err, jobs) => {
        if (err) {
            console.log(`Error getting /jobs: ${err}`);
            res.sendStatus(500);
        } else {
            if (jobs.length === 0) {
                res.status(404).json({error: "No se encontraron resultados para la búsqueda"});
            } else {
                const job = jobs[0];
                delete job._id;
                res.json(job);
            }
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

app.delete(BASE_API_URL + "/jobs-companies-innovation-stats/:territory/:year", (request, response) => {
    const territory = request.params.territory;
    const year = parseInt(request.params.year);

    dbAcb.remove({ territory: territory, year: year }, {}, (err, numRemoved) => {
        if (err) {
            console.log(`Error removing data: ${err}`);
            response.sendStatus(500);
        } else if (numRemoved === 0) {
            response.status(404).send({ error: "No se encontró el elemento con el territorio y año especificados" });
        } else {
            response.status(204).send(`El recurso con territorio ${territory} y año ${year} ha sido eliminado correctamente`);
            console.log(`Se ha eliminado el recurso con territorio: ${territory} y año: ${year}`);
        }
    });
});




// PUT actualizar recurso existente
app.put(BASE_API_URL + "/jobs-companies-innovation-stats/:territory", (request, response) => {
    const territory = request.params.territory; // Obtener el territorio de la URL
    const updatedStat = request.body; // Obtener los nuevos datos del cuerpo de la solicitud

    if (!updatedStat.hasOwnProperty("territory") || !updatedStat.hasOwnProperty("year") || !updatedStat.hasOwnProperty("jobs_industry") || !updatedStat.hasOwnProperty("companies_with_innovations") || !updatedStat.hasOwnProperty("temporary_employment")) {
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    } else if (typeof updatedStat.companies_with_innovations !== "number" || typeof updatedStat.temporary_employment !== "number") {
        response.status(400).send({ error: "Los campos companies_with_innovations y temporary_employment deben ser números" });
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

}
export{loadBackendAcb};