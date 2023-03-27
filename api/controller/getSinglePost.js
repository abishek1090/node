const postSchema = require("../models/post");

const getSinglePost = async (req, res) => {
    try {
        const post = await postSchema.find({ _id: req.params.id });
        return res.json(post)
    } catch (err) {
        return res.status(404).json("Error Occurred");
    }

}

exports.getSinglePost = getSinglePost;