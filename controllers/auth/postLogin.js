const User = require("../../models/user");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = "JWT_TOKEN";
      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
        },
      });
    }
    return res.status(400).send("invalid credentials. try again");
  } catch (error) {
    return res.status(500).send("somthing wrong");
  }
};

module.exports = postLogin;
