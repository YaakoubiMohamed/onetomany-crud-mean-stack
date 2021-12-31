const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    titre: String,
    auteur: String,
    createdAt: String,
    comments: [
      {
        type: mongoose.Schema.Types.Array,
        ref: "Comment",
        required: false
      },
      
    ]
  })
);

module.exports = Post;