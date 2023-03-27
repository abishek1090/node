const postSchema = require("../models/post");
const current_timestamp = new Date().getTime()
const dateAndTime = new Date(current_timestamp).toDateString();
const validDate = dateAndTime.split(" ");
const addPost = async (req, res) => {
    const post = new postSchema({
        username: req.body.username,
        topic: req.body.topic,
        description: req.body.description,
        createdAt: new Date(),
        count: 0,
        dateAndTime: validDate[2] + " " + validDate[1] + validDate[3]
    });

    try {
        const a1 = await post.save();
        return res.status(200).json("Posted Successfully" + a1);
    } catch (err) {
        return res.status(404).json("Error Occurred");
    }
}
exports.addPost = addPost;