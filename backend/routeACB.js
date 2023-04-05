import express from "express";
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v1";
import dataStore from "nedb";
var dbAcb = new dataStore();

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
     year: 2008,
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
    {
     territory: "Belgica",
     year: 2008,
     jobs_industry: 726100,
     companies_with_innovations: 0,
     temporary_employment: 9.42
    },
    {
     territory: "Bulgaria",
     year: 2008,
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
    }
   ];



function loadBackendAcb(app){
    // /////////////////////////////////////////////////////////                                             ///////////////////////////////////////////////////////// 
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES ANTONIO CARRANZA BARROSO /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////             
app.use(express.json());                                /////////////////////////////////////////////////////////


app.get(BASE_API_URL + "/jobs-companies-innovation-stats/docs", (req, res) => {
    console.log("New GET request to /jobs-companies-innovation-stats/docs");
    res.redirect("https://documenter.getpostman.com/view/14969056/2s93JzN1Yu");
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
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    let queryCount = 0;

    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            queryCount++;
            if (key === "year") {
                searchQuery[key] = parseInt(query[key]);
            } else if (key === "jobs_industry") {
                searchQuery[key] = parseInt(query[key]);
            } else if (key === "companies_with_innovations" || key === "temporary_employment") {
                searchQuery[key] = parseFloat(query[key]);
            } else if (key === "territory") {
                searchQuery[key] = new RegExp(query[key], "i");
            }
        }
    }

    dbAcb.find(searchQuery).skip(skip).limit(limit).exec((err, jobs) => {
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

}
export{loadBackendAcb};