"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var api_1 = require("./api");
require('dotenv').config();
//const cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
/*
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE"
}*/
//app.use(cors(corsOptions));
//app.use(fileUpload());
app.use(bodyParser.json());
(0, api_1.buildRoutes)(app);
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on ".concat(port, "..."));
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));
    console.log(new Date().toLocaleString().split(',')[0]);
});
