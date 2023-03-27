const commentSchema = require("../models/comment");
const current_timestamp = new Date().getTime()
const dateAndTime = new Date(current_timestamp).toDateString();
const validDate = dateAndTime.split(" ");
const addComment = async (req, res) => {
    const comments = new commentSchema({
        username: req.body.username,
        message: req.body.message,
        postId: req.body.postId,
        parentId: req.body.parentId || undefined,
        createdAt: validDate[2] + " " + validDate[1] + validDate[3],
        createdTime: new Date(),
    })
    try {
        const a1 = await comments.save();
        return res.json(a1)
    }
    catch (err) {

        return res.json("Error Occurred");
    }

}
exports.addComment = addComment;