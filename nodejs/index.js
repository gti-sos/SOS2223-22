var express = require('express');
var cool = require('cool-ascii-faces');
var cgm = require("../index-CGM");
var bodyParser = require("body-parser");
const backend = require('../backend');
var app = express();
var port = process.env.PORT || 12345;
const BASE_API_URL = "/api/v1";
var dataACB = [];
var dataCGM = [];



app.use("/",express.static("./public"));

app.use(bodyParser.json()); //PARSEA a JSON DIRECTAMENTE

app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});
backend(app);


// /////////////////////////////////////////////////////////                                       //////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES CARLOS GATA MASERO //////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////                                       //////////////////////////////////////////////////////////


app.get("/samples/CGM",(req,res)=>{
    res.send(cgm.media_sp(cgm.datos_cgm));
    console.log("New request");
});

//GET de todos los elementos
app.get(BASE_API_URL+"/cgm-stats",(req,res)=>{
    res.json(dataCGM);
    console.log("New GET request /cgm-stats");
});

//GET loadInitialData
app.get(BASE_API_URL+"/cgm-stats/loadInitialData",(req,res)=>{
    dataCGM = cgm.datos_cgm;
    res.json(dataCGM);
    console.log(cgm.datos_cgm);
    console.log("New GET request /cgm-stats/loadInitialData");
});

//GET recurso especifico
app.get(BASE_API_URL+"/cgm-stats/:territory",(req,res)=>{
    const territory = req.params.territory; // URL: parámetro de territorio
    console.log(territory);
    const resource = dataCGM.find(r => r.territory === territory); // busca el recurso por territorio
    console.log(resource);
    if (resource) {
        res.json(resource); // Devolver recurso (respuesta HTTP 200)
    } else {
        res.status(404).json({error: "Recurso no encontrado"}); // Devolver error HTTP 404 si no encuentra recurso
    }
});

//POST ok
app.post(BASE_API_URL + "/cgm-stats", (request, response) => {
    const ns = request.body;
   // response.sendStatus(201); // Objeto creado ok
     // Comprueba que el JSON tiene los campos correctos
  if (!ns.hasOwnProperty("territory") || !ns.hasOwnProperty("year") || !ns.hasOwnProperty("ICT_manufacturing_industry") || !ns.hasOwnProperty("wholesale_trade") || !ns.hasOwnProperty("edition_of_computer_program")) 
  {
    response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" }); // Enviar una respuesta con el código 400 (Bad Request) si el objeto JSON no tiene los campos esperados
    return;
  }
    const conflictIndex = dataCGM.findIndex(stat => stat.territory === ns.territory 
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
      console.log("Nuevo post /cgm-stats");
    }
  });

//POST fallo
app.post(BASE_API_URL+"/cgm-stats/:year",(req,res)=>{
    res.sendStatus(405, "Method not allowed"); // respuesta ERROR 405
    console.log("New post /cgm-stats/:year");
});

//DELETE  array completo
app.delete(BASE_API_URL+"/cgm-stats", (request, response) => {
    if (!request.body || Object.keys(request.body).length === 0) {
        dataCGM = [];
        response.status(200).send("Los datos se han borrado correctamente");
    }else{
        if (dataCGM.length == 0) { // si no encuentra el Objeto -> error 404 ya que el objeto no existe  
            response.status(404).send("El objeto no existe");
        }
    }
    console.log("Se ha borrado /cgm-stats");
});

//DELETE  DE UN RECURSO
app.delete(BASE_API_URL + "/cgm-stats/:territory", (request, response) => {
    const territory = request.params.territory;
    const indice = dataCGM.findIndex(i => i.territory === territory); // Encontrar el índice del elemento a eliminar
    if (indice !== -1) { // Si encuentra el elemento segun el indice, lo elimina y envia una respuesta + 204 (No Content)
      dataCGM.splice(indice, 1);
      response.status(204).send("Se ha eliminado correctamente el objeto con territory= "+territory);
      console.log(territory+" eliminado correctamente");
    } else { // respuesta + código 404 (Not Found) si no encuentra el elemento
      response.status(404).send({ error: "No se encontró el elemento con el territorio especificado" });
    }
  });

// PUT actualizar recurso existente
app.put(BASE_API_URL + "/cgm-stats/:territory", (request, response) => {
    const territory = request.params.territory; 
    const upd_s = request.body;
    if (!upd_s.hasOwnProperty("territory")) { // Comprobar si el cuerpo de la solicitud contiene el campo "territory"
        response.status(400).send({ error: "El objeto JSON no tiene los campos esperados" });
        return;
    }
    if (territory !== upd_s.territory) { // Comprobar si el "territory" de la URL es igual al "territory" de la solicitud
        response.status(400).send({ error: "El ID del recurso no coincide con el ID de la URL" });
        return;
    }
    const indice = dataCGM.findIndex(stat => stat.territory === territory); // Encontrar el índice del recurso a actualizar
    console.log(indice);
    if (indice !== -1) {
        dataCGM[indice] = upd_s; // Actualizar recurso
        response.sendStatus(204); // Enviar respuesta actualización exitosa
        console.log("Recurso actualizado: " + territory);
    } else {
        response.status(404).send({ error: "Recurso no encontrado" }); // Si no se encuentra el recurso, devolver un código de estado 404
    }
});

  //PUT a lista de recursos
  app.put(BASE_API_URL + "/cgm-stats",(request,response)=>{
    response.sendStatus(405, "Method not allowed");
});

// /////////////////////////////////////////////////////////                                         ///////////////////////////////////////////////////////// 
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES THOMAS TEJEDA GORDON /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////                                         /////////////////////////////////////////////////////////

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
