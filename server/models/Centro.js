var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * =============================
 * Esquema de centro deportivo
 * =============================
 * 
 * Contiene todos los datos que necesitan ser guardados de los centros deportivos en los que hay pistas de pádel
 */
var centroSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del centro es necesario']
    },
    poblacion: {
        type: Schema.Types.ObjectId,
        ref: 'Poblacion',
        required: [true, 'La población es necesaria']
    },
    tarifas: [{
        type: String
    }],
    web: {
        type: String
    }
}, {
    collection: 'Centros'
});

//Se exporta el modelo para usarlo en el resto de la aplicación
module.exports = mongoose.model('Centro', centroSchema);