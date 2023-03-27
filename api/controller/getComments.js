const commentSchema = require("../models/comment");


const getComments = async (req, res) => {
    try {
        const comments = await commentSchema.find({ postId: req.params.id }).sort({ "createdTime": -1 });
        res.json(comments)
    } catch (err) {
        return res.status(404).json("Error Occurred");
    }

}

exports.getComments = getComments;