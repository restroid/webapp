// Coin.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Menu = new Schema({
  name: {
    type: String
  },
  price: {
     type: Number
  },
  section:{
    type: String
  },
  IsNonVeg:{
    type : Boolean
  }
},{
    collection: 'menu'
});

module.exports = mongoose.model('Menu', Menu);