const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");

const postUser = async (req, res) => {
    const user = await userSchema.count({ username: req.body.username });

    if (user !== 0) return res.status(404).json("User already exists!");

    const hash = await bcrypt.hash(req.body.password, 10);
    const post = new userSchema({
        username: req.body.username,
        password: hash,
        email: req.body.email
    })
    try {
        const a1 = await post.save();
        req.session.isAuth = true;
        req.session.user = {
            username: req.body.username
        };
        return res.status(200).json(req.body.username);
    } catch (err) {
        return res.status(502).json("Error Occurred");
    }

}

exports.postUser = postUser