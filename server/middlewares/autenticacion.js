const jwt = require("jsonwebtoken");

/**
 * ===================================
 * Verificar si la autorización es correcta
 * ===================================
 */
let verificaToken = (req, res, next) => {

    //Leer Authorization, que viene en los headers de la request
    let token = req.get("Authorization");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Autorización no válida"
                }
            });
        }

        // Si el token es correcto, en decoded se encuentra toda la información que contiene el usuario, porque es lo que contenía el token
        // Metemos los datos del decoded.usuario en req.usuario para poder utilizarlos en cualquier petición que llame al middleware
        req.usuario = decoded.usuario;

        // Next() para que continúe el código de la petición que ha llamado al middleware
        next();

    });

}

module.exports = {
    verificaToken
}