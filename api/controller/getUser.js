const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
  try {
    const user = await userSchema.find({ username: req.body.username });
    if (user.length === 0) return res.status(404).json("No such user exists!");
    const isPasswordCorrect = await bcrypt.compareSync(req.body.password, user[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong password!");
    req.session.isAuth = true;
    req.session.user = {
      username: req.body.username
    };

    return res.status(200).json(req.session);
  } catch (err) {
    return res.status(404).json("Error Occurred");
  }

}

exports.getUser = getUser;