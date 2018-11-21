const mongoose = require("mongoose");
const dbName = 'Padel';
// URI de mongoDB Atlas
const dbURI = "mongodb+srv://Alexbuesa:alexbuesa_admin@alexbuesa-cluster-prueba-vioyr.gcp.mongodb.net/" + dbName;

const options = {
    reconnectTries: Number.MAX_VALUE, // Por el nombre parece obvio lo que es, pero no he probado a tocarlo ni nada. No es necesario.
    poolSize: 10, // No se que es. No es necesario.
    useNewUrlParser: true // No es necesario de momento. No se exáctamente que hace, si no se pone simplemente salta un warning.
};

// Pronesa para coenctar
mongoose.connect(dbURI, options).then(
    () => {
        console.log("Conexión establecida con la BD");
    },
    err => {
        console.log("Ha ocurrido un error conectando a la BD: ", err);
    }
);

// require any models
// No se pa que se requiere ahora mismo
//require("../models/Usuario");