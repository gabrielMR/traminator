const express = require('express');
const app = express();
const VehiculoChofer = require('../models/vehiculochofer');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion')

app.get('/vehiculochofer', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    VehiculoChofer.find({ estado: true }, 'fecha placa descripcion estado idLinea idChofer')
        .skip(desde)
        .limit(limite)
        .exec((err, vehiculochoferes) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            VehiculoChofer.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    vehiculochoferes,
                    cuantos: conteo
                });
            });

        });
});
app.post('/vehiculochofer', function(req, res) {

    let body = req.body;
    let vehiculochofer = new VehiculoChofer({
        fecha: body.fecha,
        placa: body.placa,
        descripcion: body.descripcion,
        estado: body.estado,
        idLinea: body.idLinea,
        idChofer: body.idChofer
    });

    vehiculochofer.save((err, vehiculochoferDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            vehiculochofer: vehiculochoferDB
        });

    });

});

module.exports = app;