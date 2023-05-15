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
console.log("B");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));

loadBackendCGM_v1(app);
loadBackendCGM_v2(app);
loadBackendAcb1(app);
loadBackendAcb(app);

//app.use(loadBackendAcb1);
app.use(handler);
app.listen(port,()=>{
    console.log(`Listening in port ${port}`);
});

