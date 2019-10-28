const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let denunciaSchema = new Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    placa: {
        type: String,
        required: [true, 'La placa es requerida']
    },
    idChofer: {
        type: String,
        required: [true, 'El id Chofer es necesario']
    }
});

denunciaSchema.methods.toJSON = function() {
    let denuncia = this;
    let denunciaObject = denuncia.toObject();
    return denunciaObject;
}

module.exports = mongoose.model('Denuncia', denunciaSchema);