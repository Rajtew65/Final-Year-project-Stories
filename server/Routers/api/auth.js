const express = require("express");
const Router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

//testing the auth route
Router.get("/", auth, async (req, res) => {
  // res.status(200).json({ msg: "you are using the auth route" });
  //here user is the payload being provided
  const { id } = req.user;
  try {
    //sending the data except the password
    const data = await User.findById(req.user.id).select("-password");
    res.send(data);
  } catch (err) {
    res.status(401).json({ error: err });
  }
});

//@route POST api/auth
//@desc  login the user
//@access Private

Router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ errors: [{ msg: "invalid credentials" }] });
    }

    //matching the credentials
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({ msg: "invalid credentials" });
    }

    //setting the payload
    const payload = {
      user: {
        id: user.id,
      },
    };
    let token;
    try {
      jwt.sign(
        payload,
        config.get("secret"),
        { expiresIn: "1hr" },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "Logged In" });
        }
      );
    } catch (err) {
      throw err;
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = Router;
