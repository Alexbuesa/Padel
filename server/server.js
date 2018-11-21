require("./config/config");
require("./config/db");
//require('bootstrap');

const express = require('express');
const path = require("path");

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

//Configuración global de rutas
app.use(require("./routes/index"));

console.log(process.env);

app.listen(process.env.PORT, () => console.log("Escuchando puerto: ", process.env.PORT));