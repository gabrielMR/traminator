const express = require('express');
const app = express();
const Linea = require('../models/linea');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion')

app.get('/linea', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Linea.find({}, 'identificador inicio fin coordenadas destinos')
        .skip(desde)
        .limit(limite)
        .exec((err, lineas) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Linea.count((err, conteo) => {
                res.json({
                    ok: true,
                    lineas,
                    cuantos: conteo
                });
            });

        });
});

app.post('/linea', function(req, res) {

    let body = req.body;
    let linea = new Linea({
        identificador: body.identificador,
        inicio: body.inicio,
        fin: body.fin,
        coordenadas: JSON.parse(body.coordenadas),
        destinos: JSON.parse(body.destinos)
    });

    linea.save((err, lineaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            linea: lineaDB
        });

    });

});

module.exports = app;