const Post = require("../model/schema");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({createdAt: "desc"}).exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({error: "Internal server error"});
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({error: "Post not found"});
    }
  } catch (err) {
    res.status(500).json({error: "Internal server error"});
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({error: "Bad request"});
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({error: "Post not found"});
    }
  } catch (err) {
    res.status(500).json({error: "Internal server error"});
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id).exec();
    if (post) {
      res.sendStatus(204);
    } else {
      res.status(404).json({error: "Post not found"});
    }
  } catch (err) {
    res.status(500).json({error: "Internal server error"});
  }
};
