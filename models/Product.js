const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    _id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    price: {type: String, required: true},
    info: {type: String, required: true},
    img: {type: String, required: true},
    factoriesID: {type: Array, required: true},

})

module.exports = model('products', schema);