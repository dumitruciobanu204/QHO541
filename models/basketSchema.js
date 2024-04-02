const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketSchema = new Schema({
    title: String,
    price: Number,
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, default: function() { return this.price * this.quantity; } },
    addedAt: { type: Date, default: Date.now }
}, { collection: 'Basket' });

const Basket = mongoose.model('Basket', basketSchema);

module.exports = Basket;
