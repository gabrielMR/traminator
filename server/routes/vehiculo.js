const express = require('express');
const app = express();
const Vehiculo = require('../models/vehiculo');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion')

app.get('/vehiculo', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Vehiculo.find({ estado: true }, 'placa descripcion estado idLinea')
        .skip(desde)
        .limit(limite)
        .exec((err, vehiculos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Vehiculo.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    vehiculos,
                    cuantos: conteo
                });
            });

        });
});
app.post('/vehiculo', function(req, res) {

    let body = req.body;
    let vehiculo = new Vehiculo({
        placa: body.placa,
        descripcion: body.descripcion,
        estado: body.estado,
        idLinea: body.idLinea
    });

    vehiculo.save((err, vehiculoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            vehiculo: vehiculoDB
        });

    });

});

module.exports = app;