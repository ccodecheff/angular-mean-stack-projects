const express = require("express");
const bodyParser = require("body-parser");
const mongoose= require("mongoose");

const Post= require('./models/post');

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


// get post from client
  app.post("/api/posts", (req, res, next) => {
 // calling mongoose Post constructor and instantiating req title and content to database
    const post =  new Post({
      title:req.body.title,
      content: req.body.content
    });
    // saving data to database
  post.save().then(createdPost=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });

  });

  // sending data to client
  app.get("/api/posts", (req, res, next) => {
    // Post is mongoose constructor we don't need new constructor
    Post.find().then(documents=>{
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
      });
    });

  });
// deleting post in database for a specific id
  app.delete("/api/posts/:id", (req,res,next)=>{
    Post.deleteOne({_id:req.params.id})
    .then(result=>{
      console.log(result);

      res.status(200).json({
        message: "Posts Deleted"
      });
    });

  });
// this app.js could be exported anywhere outside this file
module.exports = app;
