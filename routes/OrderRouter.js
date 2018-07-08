const express = require('express');
const app = express();
const OrderRouter = express.Router();
const Order = require('../models/Order.model');

OrderRouter.route('/').get(function (req, res) {
   Order.find(function (err, orders){
      if(err){
        console.log(err);
      }
      else {
        res.render('order/index', {orders: orders});
      }
    });
});

OrderRouter.route('/create').get(function (req, res) {
   res.render('order/create');
 });

OrderRouter.route('/post').post(function (req, res) {
  const order = new Order(req.body);
  order.orderItems=[];
    if(req.body.item1!=null)
      order.orderItems.push({menuItem:req.body.item1, quantity:req.body.item1qty });
    if(req.body.item2!=null)
      order.orderItems.push({menuItem:req.body.item2, quantity:req.body.item2qty });
    console.log(order);
  order.save()
     .then(order => {
     res.redirect('/order');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

OrderRouter.route('/details/:id').get(function (req, res) {
   const id = req.params.id;
   Order.findById(id, function (err, order){
    console.log(order);
       res.render('order/details', {order: order});
   });
 });

 
 OrderRouter.route('/deliver/:id').get(function (req, res) {
  const id=req.params.id;  
  Order.findById(id,
        function(err, order){
         if(err) res.json(err);
         else{
            order.isDelivered=true;
            order.save().then(customer => {
            res.redirect('/order');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
         }
     });
 });

module.exports = OrderRouter;