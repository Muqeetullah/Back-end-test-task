const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postController = require("./controller/postcontrol");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// get all
app.get("/posts", postController.getAllPosts);

// search post
app.get("/posts/:id", postController.getPostById);

// create new post
app.post("/posts", postController.createPost);

// edit
app.put("/posts/:id", postController.updatePost);

// delete
app.delete("/posts/:id", postController.deletePost);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
