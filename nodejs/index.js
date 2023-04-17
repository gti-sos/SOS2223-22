import express from "express";
import cors from "cors";
import  { loadBackendAcb } from "../backend/routeACB v2.js";// GET,PUT,DELETE,POST Antonio Carranza Barroso
import  {loadBackendCGM_v1} from "../backend/routeCGM.js"; // GET,PUT,DELETE,POST Carlos Gata Masero
import  {loadBackendCGM_v2} from "../backend/routeCGM-v2.js"; // GET,PUT,DELETE,POST Carlos Gata Masero
import {handler} from "../frontend/build/handler.js";
var app = express();

var port = process.env.PORT || 12345;
//app.use("/",express.static("./public"));
import { loadBackendAcb1 } from "../backend/routeACB.js";

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));

loadBackendCGM_v1(app);
loadBackendCGM_v2(app);
loadBackendAcb(app);
//app.use(loadBackendAcb1);
app.use(handler);
app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});

//backend(app);





// /////////////////////////////////////////////////////////                                         ///////////////////////////////////////////////////////// 
// ///////////////////////////////////////////////////////// DATOS Y PETICIONES THOMAS TEJEDA GORDON /////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////                                         /////////////////////////////////////////////////////////

// app.get("/samples/TTG",(req,res)=>{
    
//     var datos = [
//         {
//             country: "alemania",
//             year: 2008,
//             traveler: 84358.67,
//             overnight_stay: 496172.83,
//             average_stay: 588170522365988
    
//         },
//         {
//             country: "francia",
//             year: 2008,
//             traveler: 44106.8,
//             overnight_stay: 155695.33,
//             average_stay: 35299620466685400
    
//         },
//         {
//             country: "paises bajos",
//             year: 2008,
//             traveler: 23378.51,
//             overnight_stay: 156249.45,
//             average_stay: 668346485725566
    
//         },
//         {
//             country: "españa",
//             year: 2008,
//             traveler: 494854.35,
//             overnight_stay: 1742019.58,
//             average_stay: 35202672867279000
    
//         },
//         {
//             country: "reino unido",
//             year: 2008,
//             traveler: 154465.66,
//             overnight_stay: 978510.45,
//             average_stay: 6334808979549240
    
//         },
//         {
//             country: "alemania",
//             year: 2009,
//             traveler: 60815.36,
//             overnight_stay: 422226.55,
//             average_stay: 6942761664158530
    
//         },
//         {
//             country: "francia",
//             year: 2009,
//             traveler: 35623.35,
//             overnight_stay: 134287.3,
//             average_stay: 37696426641514600
    
//         },
//         {
//             country: "paises bajos",
//             year: 2009,
//             traveler: 22009.85,
//             overnight_stay: 170564.42,
//             average_stay: 7749458537881900
    
//         },
//         {
//             country: "españa",
//             year: 2009,
//             traveler: 442046.24,
//             overnight_stay: 1564054.5,
//             average_stay: 353821468993832
    
//         },
//         {
//             country: "reino unido",
//             year: 2009,
//             traveler: 145488.61,
//             overnight_stay: 1008017.27,
//             average_stay: 6928496120761620
    
//         }
    
//     ];
    
//     // Datos de territorio de alemania
//     var valores = datos.filter(territorio => territorio.country == "alemania");
    
//     // Valores de traveler
//     var traveler_data = [];
//     valores.forEach(valor => {traveler_data.push(valor.traveler)});
    
//     // Calcular media
//     suma = 0;
//     traveler_data.forEach(num => {suma += num});
//     media = Math.round((suma/traveler_data.length) * 1000) / 1000;
    
//     // Mensaje por pantalla
//     res.send("La media de los viajeros en Alemania es de: "+media.toString());
// });

// app.get("/samples/RGA",(req,res)=>{
//     var datos = [
//         { territory: "andalucia", year: 2008, telecommunication: 2328527, computer_program_edition: 19662, programming_and_others: 455372 },
//         { territory: "andalucia", year: 2009, telecommunication: 2208025, computer_program_edition: 16803, programming_and_others: 555635 },
//         { territory: "andalucia", year: 2010, telecommunication: 2043994, computer_program_edition: 16404, programming_and_others: 576863 },
//         { territory: "andalucia", year: 2011, telecommunication: 1922890, computer_program_edition: 15181, programming_and_others: 571181 },
//         { territory: "andalucia", year: 2012, telecommunication: 1696716, computer_program_edition: 29119, programming_and_others: 507228 },
//         { territory: "spain", year: 2008, telecommunication: 18579368, computer_program_edition: 458703, programming_and_others: 10474035 },
//         { territory: "spain", year: 2009, telecommunication: 18325916, computer_program_edition: 464724, programming_and_others: 10617023 },
//         { territory: "spain", year: 2010, telecommunication: 16984206, computer_program_edition: 457495, programming_and_others: 10822351 },
//         { territory: "spain", year: 2011, telecommunication: 16306440, computer_program_edition: 464939, programming_and_others: 11115619 },
//         { territory: "spain", year: 2012, telecommunication: 14888620, computer_program_edition: 431462, programming_and_others: 11419614 }
//     ];

//     // Datos de territorio de España
//     var valores = datos.filter(territorio => territorio.territory == "spain");

//     // Valores de telecommunication
//     var valores_traveler = [];
//     valores.forEach(valor => {valores_traveler.push(valor.telecommunication)});

//     //calcular media
//     suma_total = 0;
//     valores_traveler.forEach(num => {suma_total+= num});
//     media = Math.round((suma/valores_traveler.length) * 1000) / 1000;
    

//     // Mensaje por pantalla
//     res.send("La media de la inversión en programación en España es de: "+media.toString());
// });
