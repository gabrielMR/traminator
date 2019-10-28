const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;


let vehiculoSchema = new Schema({
    placa: {
        type: String,
        unique: true,
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
    }
});

vehiculoSchema.methods.toJSON = function() {
    let vehiculo = this;
    let vehiculoObject = vehiculo.toObject();
    return vehiculoObject;
}
vehiculoSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});
module.exports = mongoose.model('Vehiculo', vehiculoSchema);