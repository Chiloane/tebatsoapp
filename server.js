"use strict";

//load modules;
const dot_env = require("dotenv");
const app = require("./app");
const port = process.env.PORT || 3001;

//configure dotenv;
dot_env.config({silent: true});

//create server;
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});