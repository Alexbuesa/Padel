var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * =============================
 * Esquema de población
 * =============================
 * 
 * Contiene todos los datos que necesitan ser guardados de las poblaciones
 * 
 * Opciones:
 * - Tener en la BD todas las poblaciones de España (Creo que es lo mejor, así se evitan troleos de usuarios y problemas varios)
 * - Tener las principales y conocidas nuestras, y permitir a los usuarios insertar poblaciones (Habría que hacer validaciones contra alguna base de datos de poblaciones reales)
 * 
 * Habría que hacer otro esquema para provincias, importar todas las provincias de españa, y que las poblaciones tenga la referencia a la provincia que pertenecen
 */
var poblacionSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre de la población es necesario']
    }
}, {
    collection: 'Poblaciones'
});

//Se exporta el modelo para usarlo en el resto de la aplicación
module.exports = mongoose.model('Poblacion', poblacionSchema);