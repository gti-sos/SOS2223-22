var express = require('express');
var cool = require('cool-ascii-faces');



var app = express();
var port = process.env.PORT || 12345;

app.get("/cool",(req,res)=>{
    
    res.send(cool());
    console.log("New request");
});

app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});

// DATOS ANTONIO CARRANZA BARROSO
app.get("/samples/ACB",(req,res)=>{
    
    var datos = [
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
       
       var r = 0.0;
    
       datos.forEach(function(a){
           r += a.temporary_employment;
       });
    
       var mensaje =  (`La media de empleo temporal en el  2008  fue: ${r/datos.length}`);
       
       console.log(mensaje);
       res.send(mensaje.toString());
  

   
});


// DATOS CARLOS GATA MASERO
app.get("/samples/CGM",(req,res)=>{
    
    var datos = [
        { territory: "spain", year: 2008, ICT_manufacturing_industry: 0.05, wholesale_trade: 0.18, edition_of_computer_program: 0.01 },
        { territory: "spain", year: 2009, ICT_manufacturing_industry: 0.04, wholesale_trade: 0.14, edition_of_computer_program: 0.01 },
        { territory: "spain", year: 2010, ICT_manufacturing_industry: 0.03, wholesale_trade: 0.12, edition_of_computer_program: 0.01 },
        { territory: "spain", year: 2011, ICT_manufacturing_industry: 0.04, wholesale_trade: 0.10, edition_of_computer_program: 0.01 },
        { territory: "spain", year: 2012, ICT_manufacturing_industry: 0.04, wholesale_trade: 0.12, edition_of_computer_program: 0.02 },
        { territory: "spain", year: 2013, ICT_manufacturing_industry: 0.06, wholesale_trade: 0.28, edition_of_computer_program: 0.03 },
        { territory: "spain", year: 2014, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.28, edition_of_computer_program: 0.04 },
        { territory: "spain", year: 2015, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.28, edition_of_computer_program: 0.05 },
        { territory: "spain", year: 2016, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.29, edition_of_computer_program: 0.05 },
        { territory: "spain", year: 2017, ICT_manufacturing_industry: 0.07, wholesale_trade: 0.30, edition_of_computer_program: 0.05 }
    ];
    
    // Datos de territorio de spain
    var valores = datos.filter(territorio => territorio.territory == "spain");
    
    // Valores de wholesale_trade
    var valores_wt = [];
    valores.forEach(valor => {valores_wt.push(valor.wholesale_trade)});
    
    // Calcular media
    suma_total = 0;
    valores_wt.forEach(num => {suma_total+= num});
    media = Math.round((suma_total/valores_wt.length) * 1000) / 1000;
    
    // Mensaje por pantalla
    res.send("La media del comercio al por mayor en España es de: "+media.toString());
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
            average_stay: 35299620466685400n
    
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
            average_stay: 35202672867279000n
    
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
            average_stay: 37696426641514600n
    
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
