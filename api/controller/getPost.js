const postSchema = require("../models/post");

const getPost = async (req, res) => {
    try {
        const posts = await postSchema.find({ username: req.params.username }).sort({ "createdAt": -1 });
        return res.json(posts)
    }
    catch (err) {

        return res.status(404).json("Error Occurred");
    }


}

exports.getPost = getPost;