const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let lineaSchema = new Schema({
    identificador: {
        type: String,
        required: [true, 'El identificador de linea es necesario']
    },
    inicio: {
        type: String,
        required: [true, 'El inicio es necesario']
    },
    fin: {
        type: String,
        required: [true, 'El fin es necesario']
    },
    coordenadas: [{
        lat: String,
        lng: String
    }],
    destinos: [{
        nombre: String
    }]
});

lineaSchema.methods.toJSON = function() {
    let linea = this;
    let lineaObject = linea.toObject();
    return lineaObject;
}

module.exports = mongoose.model('Linea', lineaSchema);