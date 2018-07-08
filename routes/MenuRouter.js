const express = require('express');
const app = express();
const MenuRouter = express.Router();
const Menu = require('../models/Menu.model');

MenuRouter.route('/').get(function (req, res) {
   Menu.find(function (err, menus){
      if(err){
        console.log(err);
      }
      else {
        res.render('Menu/index', {menus: menus});
      }
    });
});

MenuRouter.route('/create').get(function (req, res) {
   res.render('Menu/create');
 });

 MenuRouter.route('/post').post(function (req, res) {
   const menu = new Menu(req.body);
   console.log(menu);
   menu.save()
     .then(menu => {
     res.redirect('/menu');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

MenuRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Menu.findById(id, function (err, menu){
       res.render('Menu/edit', {menu: menu});
   });
 });

 MenuRouter.route('/update/:id').post(function (req, res) {
   Menu.findById(req.params.id, function(err, menu) {
     if (!menu)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       menu.name = req.body.name;
       menu.price = req.body.price;
 
       menu.save().then(menu => {
           res.redirect('/menu');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

 MenuRouter.route('/delete/:id').get(function (req, res) {
   Menu.findByIdAndRemove({_id: req.params.id},
        function(err, menu){
         if(err) res.json(err);
         else res.redirect('/menu');
     });
 });

module.exports = MenuRouter;