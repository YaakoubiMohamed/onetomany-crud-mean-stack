
// Post model
let Post = require('../models/post');

const getPosts = ((req, res) => {
    Post.find({})
        .then(result => res.status(200).json( result ))
        .catch(error => res.status(500).json({msg: error}))
})

const getPost = ((req, res) => {
    Post.findOne({ _id: req.params.postID })
        .then(result => res.status(200).json(result))
        .catch(() => res.status(404).json({msg: 'Post not found'}))
})

const createPost = ((req, res) => {
    Post.create(req.body)
        .then(result => res.status(200).json( result ))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updatePost = ((req, res) => {
    Post.findOneAndUpdate({ _id: req.params.postID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json( result ))
        .catch((error) => res.status(404).json({msg: 'Post not found' }))
})

const deletePost = ((req, res) => {
    Post.findOneAndDelete({ _id: req.params.postID })
        .then(result => res.status(200).json(result ))
        .catch((error) => res.status(404).json({msg: 'Post not found' }))
})

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}