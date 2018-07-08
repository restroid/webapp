// Coin.model.js

const mongoose = require('mongoose');
const Customer = new mongoose.Schema({
  name: String,
  address:String,
  phoneNumber:String
},{
    collection: 'customers'
});

module.exports = mongoose.model('Customer', Customer);