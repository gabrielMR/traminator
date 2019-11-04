const express = require('express');
const app = express();
const Recorrido = require('../models/recorrido');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion')

app.get('/recorrido', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Recorrido.find({}, 'fecha hora coordenadas idVehiculo')
        .skip(desde)
        .limit(limite)
        .exec((err, recorridos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Recorrido.count((err, conteo) => {
                res.json({
                    ok: true,
                    recorridos,
                    cuantos: conteo
                });
            });

        });
});

app.post('/recorrido', function(req, res) {

    let body = req.body;
    let recorrido = new Recorrido({
        fecha: body.fecha,
        hora: body.hora,
        coordenadas: JSON.parse(body.coordenadas),
        idVehiculo: body.idVehiculo
    });

    recorrido.save((err, recorridoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            recorrido: recorridoDB
        });

    });

});

module.exports = app;