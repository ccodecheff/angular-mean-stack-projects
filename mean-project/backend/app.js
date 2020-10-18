const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");


const postsRoutes= require('./routes/posts')


const app = express();
// Databasename: node-angular
// username-: karan
// pass- 8p5Uk2VmzeiHzMMx

// connecting to mongoose database
mongoose.connect("mongodb+srv://karan:8p5Uk2VmzeiHzMMx@cluster0.swcbv.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=>{
    console.log("Connected to Database");
  })
  .catch(()=>{
  console.log("connection failed!");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

    app.use("/api/posts",postsRoutes);
    module.exports = app;
