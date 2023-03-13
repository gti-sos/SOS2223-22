var express = require('express');
var cool = require('cool-ascii-faces');
var acb = require("../index-ACB");
var cgm = require("../index-CGM");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v1";
var dataACB = [];

app.use(bodyParser.json()); //PARSEA a JSON DIRECTAMENTE
app.get("/cool",(req,res)=>{
    
    res.send(cool());
    console.log("New request");
});


app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});


// DATOS y PETICIONES ANTONIO CARRANZA BARROSO
app.get("/samples/ACB",(req,res)=>{
    res.send(acb.media_ue(acb.datos_ACB));
    console.log("New request");
});
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
  if (!newStat.hasOwnProperty("territory") || !newStat.hasOwnProperty("year")) {
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








  










// DATOS CARLOS GATA MASERO
app.get("/samples/CGM",(req,res)=>{
    res.send(cgm.media_sp(cgm.datos_cgm));
    console.log("New request");
});


//DATOS THOMAS TEJEDA GORDON

app.get("/samples/TTG",(req,res)=>{
    
    var datos = [
        {
            country: "alemania",
            year: 2008,
            traveler: 84358.67,
            overnight_stay: 496172.83,
            average_stay: 588170522365988
    
        },
        {
            country: "francia",
            year: 2008,
            traveler: 44106.8,
            overnight_stay: 155695.33,
            average_stay: 35299620466685400
    
        },
        {
            country: "paises bajos",
            year: 2008,
            traveler: 23378.51,
            overnight_stay: 156249.45,
            average_stay: 668346485725566
    
        },
        {
            country: "españa",
            year: 2008,
            traveler: 494854.35,
            overnight_stay: 1742019.58,
            average_stay: 35202672867279000
    
        },
        {
            country: "reino unido",
            year: 2008,
            traveler: 154465.66,
            overnight_stay: 978510.45,
            average_stay: 6334808979549240
    
        },
        {
            country: "alemania",
            year: 2009,
            traveler: 60815.36,
            overnight_stay: 422226.55,
            average_stay: 6942761664158530
    
        },
        {
            country: "francia",
            year: 2009,
            traveler: 35623.35,
            overnight_stay: 134287.3,
            average_stay: 37696426641514600
    
        },
        {
            country: "paises bajos",
            year: 2009,
            traveler: 22009.85,
            overnight_stay: 170564.42,
            average_stay: 7749458537881900
    
        },
        {
            country: "españa",
            year: 2009,
            traveler: 442046.24,
            overnight_stay: 1564054.5,
            average_stay: 353821468993832
    
        },
        {
            country: "reino unido",
            year: 2009,
            traveler: 145488.61,
            overnight_stay: 1008017.27,
            average_stay: 6928496120761620
    
        }
    
    ];
    
    // Datos de territorio de alemania
    var valores = datos.filter(territorio => territorio.country == "alemania");
    
    // Valores de traveler
    var traveler_data = [];
    valores.forEach(valor => {traveler_data.push(valor.traveler)});
    
    // Calcular media
    suma = 0;
    traveler_data.forEach(num => {suma += num});
    media = Math.round((suma/traveler_data.length) * 1000) / 1000;
    
    // Mensaje por pantalla
    res.send("La media de los viajeros en Alemania es de: "+media.toString());
});

app.get("/samples/RGA",(req,res)=>{
    var datos = [
        { territory: "andalucia", year: 2008, telecommunication: 2328527, computer_program_edition: 19662, programming_and_others: 455372 },
        { territory: "andalucia", year: 2009, telecommunication: 2208025, computer_program_edition: 16803, programming_and_others: 555635 },
        { territory: "andalucia", year: 2010, telecommunication: 2043994, computer_program_edition: 16404, programming_and_others: 576863 },
        { territory: "andalucia", year: 2011, telecommunication: 1922890, computer_program_edition: 15181, programming_and_others: 571181 },
        { territory: "andalucia", year: 2012, telecommunication: 1696716, computer_program_edition: 29119, programming_and_others: 507228 },
        { territory: "spain", year: 2008, telecommunication: 18579368, computer_program_edition: 458703, programming_and_others: 10474035 },
        { territory: "spain", year: 2009, telecommunication: 18325916, computer_program_edition: 464724, programming_and_others: 10617023 },
        { territory: "spain", year: 2010, telecommunication: 16984206, computer_program_edition: 457495, programming_and_others: 10822351 },
        { territory: "spain", year: 2011, telecommunication: 16306440, computer_program_edition: 464939, programming_and_others: 11115619 },
        { territory: "spain", year: 2012, telecommunication: 14888620, computer_program_edition: 431462, programming_and_others: 11419614 }
    ];

    // Datos de territorio de España
    var valores = datos.filter(territorio => territorio.territory == "spain");

    // Valores de telecommunication
    var valores_traveler = [];
    valores.forEach(valor => {valores_traveler.push(valor.telecommunication)});

    //calcular media
    suma_total = 0;
    valores_traveler.forEach(num => {suma_total+= num});
    media = Math.round((suma/valores_traveler.length) * 1000) / 1000;
    

    // Mensaje por pantalla
    res.send("La media de la inversión en programación en España es de: "+media.toString());
});
