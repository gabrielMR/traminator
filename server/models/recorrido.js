const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
//fecha, hora, coord, idVehiculo

let recorridoSchema = new Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    hora: {
        type: String,
        required: [true, 'La hora es necesaria ctm!']
    },
    coordenadas: [{
        lat: String,
        lng: String
    }],
    idVehiculo: {
        type: String,
        required: [true, 'El id del vehiculo es necesario']
    }
});

recorridoSchema.methods.toJSON = function() {
    let recorrido = this;
    let recorridoObject = recorrido.toObject();
    return recorridoObject;
}

module.exports = mongoose.model('Recorrido', recorridoSchema);