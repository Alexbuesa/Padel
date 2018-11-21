var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

/**
 * =============================
 * Esquema de usuario
 * =============================
 * 
 * Contiene todos los datos que necesitan ser guardados de los usuarios
 */
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email obligatorio']
    },
    password: {
        type: String,
        required: [true, 'Contraseña obligatoria']
    },
    // Para saber que usuarios se han logeado con Google cuando se implemente
    google: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'Usuarios'
});

// Se sobreescribe el método toJSON para personalizar los datos que devuelve del usuario
usuarioSchema.methods.toJSON = function() {
    // Guarda el usuario entero en la variable 'user'
    let user = this;

    // Lo transforma a objeto
    let userObject = user.toObject();

    // Elimina la propiedad 'password'
    delete userObject.password;

    // Devuelve un objeto de usuario sin la password
    return userObject;
};

//Valida que sean únicos los datos de las propiedades que lleven esa condición
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

//Se exporta el modelo para usarlo en el resto de la aplicación
module.exports = mongoose.model('Usuario', usuarioSchema);