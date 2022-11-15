const express = require("express");
const Router = express.Router();
//getting the model
const UserModel = require("../../models/user.js");
//getting the bcrypt
const bcrypt = require("bcrypt");
//getting the jwt
const jwt = require("jsonwebtoken");
//getting cofig
const config = require("config");

// @route  POST api/user
// @desc   singnup the user
// @access Public

Router.post("/", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).json({ errors: [{ msg: "user exists already" }] });
    }
    user = new UserModel({
      firstname,
      lastname,
      email,
      password,
    });

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    //storing the hash password
    user.password = await bcrypt.hash(password, salt);
    //saving the user
    await user.save();

    //setting the payload
    const payload = {
      user: {
        id: user.id,
      },
    };
    let token;
    try {
      token = jwt.sign(payload, config.get("secret"), {
        expiresIn: "1h",
      });
      res.json({ token, msg: "signed In" });

      //storing the token in the local storafe
    } catch (err) {
      throw err;
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

module.exports = Router;
