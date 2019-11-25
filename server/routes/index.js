const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./login'));
app.use(require('./vehiculo'));
app.use(require('./denuncia'));
app.use(require('./linea'));
app.use(require('./recorrido'));
app.use(require('./vehiculochofer'));
module.exports = app;