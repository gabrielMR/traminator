require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//configuracion de rutas
app.use(require('./routes/index'));

//configurar la bd
mongoose.connect('mongodb://localhost:27017/traminator', { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de Datos ONLINE');

});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});