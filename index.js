var express = require('express');
var cool = require('cool-ascii-faces');



var app = express();
var port = process.env.PORT || 12345;

app.get("/faces",(req,res)=>{
    
    res.send(cool());
    console.log("New request");
});

app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});

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
       // res.send(cool());
       console.log(mensaje);
       res.send(mensaje.toString());
  

   
});
