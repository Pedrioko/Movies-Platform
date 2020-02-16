let mongoose = require('mongoose')
let validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2');

let usuarioSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    updated: { type: Date, default: Date.now },
    imageAvatar: String
}, { autoCreate: true })

usuarioSchema.plugin(require('mongoose-autopopulate'));

usuarioSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Usuario', usuarioSchema)