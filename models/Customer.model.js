// Coin.model.js

const mongoose = require('mongoose');
const Customer = new mongoose.Schema({
  name: String,
    Address:String,
  PhoneNumber:String
},{
    collection: 'customers'
});

module.exports = mongoose.model('Customer', Customer);