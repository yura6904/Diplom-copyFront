const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    _id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    coordinates: {type: Array, required: true},

})

module.exports = model('factories', schema);