
const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');


exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'la peticion no tiene la cabecera de autorization' });
    }

    var token = req.headers.authorization;

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: `token incorrecto ${err}`
            });
        }

        req.user = decoded.usuario;
        next();
    });

}
