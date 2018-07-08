const express = require('express');
const app = express();
const CustomerRouter = express.Router();
const Customer = require('../models/Customer.model');

CustomerRouter.route('/').get(function (req, res) {
   Customer.find(function (err, customers){
      if(err){
        console.log(err);
      }
      else {
        res.render('Customer/index', {customers: customers});
      }
    });
});

CustomerRouter.route('/create').get(function (req, res) {
   res.render('Customer/create');
 });

 CustomerRouter.route('/post').post(function (req, res) {
   const customer = new Customer(req.body);
   console.log(customer);
   customer.save()
     .then(customer => {
     res.redirect('/customer');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

CustomerRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Customer.findById(id, function (err, customer){
       res.render('customer/edit', {customer: customer});
   });
 });
 CustomerRouter.route('/details/:id').get(function (req, res) {
  const id = req.params.id;
  Customer.findById(id, function (err, customer){
      res.render('customer/details', {customer: customer});
  });
});
 CustomerRouter.route('/update/:id').post(function (req, res) {
   Customer.findById(req.params.id, function(err, customer) {
     if (!customer)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       customer.name = req.body.name;
       customer.address = req.body.address;
 
       customer.save().then(customer => {
           res.redirect('/customer');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

 CustomerRouter.route('/delete/:id').get(function (req, res) {
   Customer.findByIdAndRemove({_id: req.params.id},
        function(err, customer){
         if(err) res.json(err);
         else res.redirect('/customer');
     });
 });

module.exports = CustomerRouter;