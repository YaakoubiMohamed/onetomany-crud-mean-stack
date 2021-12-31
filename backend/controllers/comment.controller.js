
// Comment model
let Comment = require('../models/comment');
const Post = require('../models/post');

const getComments = ((req, res) => {
    Comment.find({})
        .then(result => res.status(200).json( result ))
        .catch(error => res.status(500).json({msg: error}))
})

const getComment = ((req, res) => {
    Comment.findOne({ _id: req.params.commentID })
        .then(result => res.status(200).json(result))
        .catch(() => res.status(404).json({msg: 'Comment not found'}))
})

const createComment = ((req, res) => {
    console.log(req.body.comment);
    //return req.body;

    Post.findOneAndUpdate({ _id: req.body._id }, {
        $push: {
          comments: req.body.comment
        }
      }, { new: true, runValidators: true })
        .then(result => {
            console.log(result);
            res.status(200).json( result )})
        .catch((error) => res.status(404).json({msg: error }))
    /*
    Post.findByIdAndUpdate(req.body._id,
        {
          $push: {
            comments: req.body
          }
        },
        { new: true, useFindAndModify: false }
    )
    
    Comment.create(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json( result )
        })
        .catch((error) => res.status(500).json({msg:  error }))
        */
        
})

const updateComment = ((req, res) => {
    Comment.findOneAndUpdate({ _id: req.params.commentID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json( result ))
        .catch((error) => res.status(404).json({msg: 'Comment not found' }))
})

const deleteComment = ((req, res) => {
    Comment.findOneAndDelete({ _id: req.params.commentID })
        .then(result => res.status(200).json(result ))
        .catch((error) => res.status(404).json({msg: 'Comment not found' }))
})

module.exports = {
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment
}