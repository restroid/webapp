const express = require('express');
const ApiRouter = express.Router();
const Menu = require('../models/Menu.model');

ApiRouter.route('/menu').get(function (req, res) {
  Menu.find(function (err, menus){
     if(err){
      res.status(400).send( err);
     }
     else {
       res.status(200).send(menus);
     }
   });
});

module.exports = ApiRouter;