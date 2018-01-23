"use strict";

//load modules;
const express = require("express");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const router = require("./routes/router");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

var file_stream = fs.createWriteStream(path.join(__dirname+"/logs/access.log"), {flags: "a"});

//build express app;
var app = express();
app.use(morgan("combined", {stream: file_stream}));
app.use(body_parser.json());
app.disable("x-powered-by");
app.use("/api", router);
app.use((err, req, res, next)=>{
    res.send({"error":err.message});
    console.log(`Error: ${err.message}`);
 });

 //connect to mongoose;
 mongoose.connect("mongodb://localhost/contacts", (err)=>{
    if(err){
        throw err;
    }
 });
 mongoose.Promise = global.Promise;

 module.exports = app;
