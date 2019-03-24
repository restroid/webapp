const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://scott:tiger@restroid.in:27017');
//mongoose.connect("mongodb://127.0.0.1:27017")
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const ApiRouter = require('./routes/ApiRouter');
const MenuRouter = require('./routes/MenuRouter');
const CustomerRouter = require('./routes/CustomerRouter');
const OrderRouter = require('./routes/OrderRouter');

app.use('/api', ApiRouter);
app.use('/menu', MenuRouter);
app.use('/customer', CustomerRouter);
app.use('/order', OrderRouter);

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,'public', 'index.html'));
});

var port=process.env.PORT || 8080;
app.set('port',port);
app.listen(port, function(){
  console.log('Node js Express js Tutorial at port', port);
});