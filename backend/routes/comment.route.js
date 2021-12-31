const express = require('express')
const router = express.Router()

const  { 
    getComments,
    getComment,
    createComment,
    updateComment,
    deleteComment 
} = require('../controllers/comment.controller')

router.get('/', getComments)

router.get('/:commentID', getComment)

router.post('/', createComment) 

router.put('/:commentID', updateComment) 

router.delete('/:commentID', deleteComment)

module.exports = router