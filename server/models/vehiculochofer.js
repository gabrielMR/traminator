const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let vehiculochoferSchema = new Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    placa: {
        type: String,
        required: [true, 'La placa es necesaria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria, color, marca, modelo']
    },
    estado: {
        type: Boolean,
        default: true
    },
    idLinea: {
        type: String,
        required: false
    },
    idChofer: {
        type: String,
        required: false
    }
});

vehiculochoferSchema.methods.toJSON = function() {
    let vehiculochofer = this;
    let vehiculochoferObject = vehiculochofer.toObject();
    return vehiculochoferObject;
}

module.exports = mongoose.model('VehiculoChofer', vehiculochoferSchema);