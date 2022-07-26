import {config} from "dotenv";
config();
import {buildRoutes} from "./api";

require('dotenv').config();
//const cors = require('cors');
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
/*
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, PUT, POST, DELETE"
}*/
//app.use(cors(corsOptions));
//app.use(fileUpload());
app.use(bodyParser.json());
buildRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on ${port}...`);
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));
    console.log(new Date().toLocaleString().split(',')[0]);
});

