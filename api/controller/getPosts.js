const postSchema = require("../models/post");
const commentSchema = require("../models/comment");

const getPosts = async (req, res) => {
    try {
        const posts = await postSchema.find().sort({ "createdAt": -1 });

        for (let i = 0; i < posts.length; i++) {
            var c = JSON.stringify(posts[i]._id);
            var v = c.split(`"`);
            var comments = await commentSchema.find({ postId: v[1] }).count();
            if(comments===0){posts[i].count = 0;}
            else{posts[i].count = comments;}        
        }
        return res.json(posts)
    } catch (err) {
        return res.status(404).json("Error Occurred");
    }

}

exports.getPosts = getPosts;