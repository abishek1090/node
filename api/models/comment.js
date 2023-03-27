const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({

    postId: {
        type: String,
        required: true
    },
    parentId: {
        type: String
    },
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required:true
    },
    createdAt:{
        type:String
    },
    createdTime:{
        type:String
    }
    

},{collection: 'comments'})

module.exports = mongoose.model('comments',commentSchema)