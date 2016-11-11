// //**************************************************************
// //************************ Pilot Projects **************************
// //**************************************************************



var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var express = require('express');
var logger = require('morgan');
var moment = require('moment');
// var bearer       = require('bearer');
var path = require('path');
// var gcm          = require('node-gcm');
// var apn          = require('apn');
var http = require('http');
var multer = require('multer');
var momentTimezone = require('moment-timezone');
var Bcrypt = require('bcryptjs');
var sanitizeHtml = require('sanitize-html');
var Converter = require("csvtojson").Converter;
var cors = require('cors');
var port = process.env.PORT || '5000';
var app = express();
var upload = multer({ dest: './uploads/' });
var fileUpload = require('express-fileupload');
var fs = require('fs');

app.use(cors());
app.use(logger('dev'));
// app.use(express.static(path.resolve(__dirname, '../public/app/')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50000000000000000000000000000kb'}));
app.use(cookieParser());
// app.use(fileUpload());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//require('./models')(app, bearer, moment, mongoose);

//************ Mongodb *********
require('./config')(app, mongoose);
require('./models')(app, mongoose);
// require('./bearer')(app, bearer, moment,Bcrypt);
require('./controllers')(app, mongoose, moment, momentTimezone, Bcrypt, sanitizeHtml, Converter, multer, path, fs);
require('./routes.js')(app, mongoose, moment, momentTimezone, Bcrypt, sanitizeHtml, Converter, multer, path, fs);



app.listen(port, function () {
    console.log("server is listening on port : ", port);
}).timeout = 25000;
