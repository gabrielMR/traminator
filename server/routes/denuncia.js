const express = require('express');
const app = express();
const Denuncia = require('../models/denuncia');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion')

app.get('/denuncia', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

    Denuncia.find({}, 'fecha placa idChofer')
        .skip(desde)
        .limit(limite)
        .exec((err, denuncias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Denuncia.count((err, conteo) => {
                res.json({
                    ok: true,
                    denuncias,
                    cuantos: conteo
                });
            });

        });
});

app.post('/denuncia', function(req, res) {

    let body = req.body;
    let denuncia = new Denuncia({
        fecha: body.fecha,
        placa: body.placa,
        idChofer: body.idChofer
    });

    denuncia.save((err, denunciaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            denuncia: denunciaDB
        });

    });

});

module.exports = app;