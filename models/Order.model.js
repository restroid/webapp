// Coin.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
  customerId: String,
  customerName: String,
  //orderDate: Date,
  isDelivered:{
    type:Boolean,
    default:false
  },
  orderItems: [new Schema({
        menuItem:String,
        quantity:Number,
        })]
}
,{
    collection: 'orders'
});

module.exports = mongoose.model('Order',Order);
