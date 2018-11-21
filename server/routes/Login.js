const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/Usuario");

const app = express();

/**
 * ======================================
 * Petición post: Login
 * ======================================
 * Recibe usuario y contraseña en el body de la request
 * Busca un usuario por email.
 * Si lo encuentra, compara la contraseña de la request con la del usuario encontrado.
 * Si coinciden, devuelve el usuario entontrado (Login correcto).
 * Hay que añadir tokens para hacerlo seguro.
 */
app.post("/login", (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

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
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }

        // Contraseña incorrecta
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrectos"
                }
            });
        }

        // token es lo mismo que authorization
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});

module.exports = app;