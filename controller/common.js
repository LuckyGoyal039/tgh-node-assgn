const { User } = require("../model/user.js");

const userLogin = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const result = req.body.password === user.password;
    if (result) {
      res.status(200).json({ user: user });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

module.exports = { userLogin };
