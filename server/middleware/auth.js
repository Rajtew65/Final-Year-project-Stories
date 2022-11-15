const jwt = require("jsonwebtoken");
const config=require('config')

module.exports = (req, res, next) => {
  //get the token from the header and also adding the key
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ msg: "authorization denied" });
  }
  try {
    const decodedtoken = jwt.verify(token, config.get("secret"));
    //authorizing the user
    req.user = decodedtoken.user;
    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
