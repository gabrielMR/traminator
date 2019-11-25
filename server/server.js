require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
let server = http.createServer(app);

//agregar para probar sockets
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');

module.exports.io = socketIO(server);
// para importar los sockets
require('./sockets/socket');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//configuracion de rutas
app.use(require('./routes/index'));
app.use(express.static(publicPath));

//configurar la bd
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de Datos ONLINE');

});

server.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});