// Coin.model.js

const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
  name:  String,
  price: Number,
  section:String,
  isNonVeg:Boolean
  }
,{
    collection: 'menu'
});

module.exports = mongoose.model('Menu', Menu);