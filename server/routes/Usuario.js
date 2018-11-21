const express = require('express');
const _ = require('underscore');

const Usuario = require("../models/Usuario");

const app = express();

/**
 * ======================================
 * Petición get: Devolver todos los usuarios
 * ======================================
 */
app.get('/usuario', (req, res) => {

    // La proyección son los campos que quieres que devuelva la consulta
    let projection = "nombre email";

    Usuario.find({}, projection)
        .exec((err, usuarios) => {

            // Algo falló en el servidor
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                usuarios
            });

        });

});

/**
 * ======================================
 * Petición get: Devolver usuario por ID
 * ======================================
 * Recibe el id en la URL.
 * Utiliza el id para buscar y devolver un usuario.
 */
app.get('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findById(id)
        .exec((err, usuarioDB) => {

            // Algo falló en el servidor
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            // Usuario no encontrado
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    err: 'Usuario no encontrdo'
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });

        });

});

/**
 * ======================================
 * Petición post: Insertar usuario
 * ======================================
 * Recibe los campos en el body de la request.
 * Crea un objeto de tipo Usuario con los datos del body.
 * Lo guarda en la base de datos.
 * Devuelve el usuario insertado.
 */
app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
    });

    usuario.save((err, usuarioDB) => {

        // Algo falló en el servidor
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Algo falló en la isnerción
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

/**
 * ======================================
 * Petición put: Actualizar usuario por ID
 * ======================================
 * Recibe el id en la URL.
 * Recibe los campos que se quieren actualizar en el body de la request.
 * Utiliza el id para buscar el usuario y lo actualiza con los nuevos datos.
 * Devuelve el usuario actualizado, con los nuevos datos (por el new: true)
 */
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    /**
     * En el body de la request vendrán varios campos, con el _pick cogemos solo los que le pongamos en el array como segundo parámetro, y se guardan en un nuevo array que llamamos body
     * No creo que llegue a ser útil, ya que nosotros decidiremos que campos llegan hasta aqui, con lo cual no sería necesario filtrarlos
     */
    let body = _.pick(req.body, ["nombre", "email"]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        //Algo falló en el servidor
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        // Usuario no encontrado(comprobar si también da este error cuando falle algo de las valdiaciones)
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: "Usuario no encontrado"
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

/**
 * ======================================
 * Petición delete: Eliminar usuario por ID
 * ======================================
 * Recibe el id en la URL.
 * Utiliza el id para buscar el usuario y lo elimina.
 * Devuelve el usuario eliminado.
 */
app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        //Algo falló en el servidor
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        // Usuario no encontrado
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;