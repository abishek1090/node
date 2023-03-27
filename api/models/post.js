
const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date
    },
    dateAndTime:{
        type:String
    },
    count:{
        type:Number
    }
    

},{collection: 'post'})

module.exports = mongoose.model('post',postSchema)