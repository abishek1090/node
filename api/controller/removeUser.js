

const removeUser = async (req, res) => {
  try {
    req.session.destroy;
  }
  catch (err) {
    return res.status(404).json(err);
  }
}

exports.removeUser = removeUser;