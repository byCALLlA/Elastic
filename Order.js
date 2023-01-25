const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    numberOrder: Number,
    author: {type: String},
    date: Date,
    paymentDate: Date,
    itemOrder: [{
        code: String,
        name: String,
        quantity: Number,
        price: Number,
        discount: Number
    }]
})

module.exports = model('Order', orderSchema)