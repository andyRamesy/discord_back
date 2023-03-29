const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");


const postRegister = async (req, res) => {
  
  try {
    const { username, mail, password } = req.body;

    //check if user exist
    const userExists = await User.exists({ mail: mail });
    if (userExists) {
      return res.status(409).send("E-mail already in use");
    }

    //encrypt pass
    const encryptPassword = await bcrypt.hash(password, 10);

    //create user doc and save in db
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptPassword,
    });

    //create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error occured...");
  }
};

module.exports = postRegister;
