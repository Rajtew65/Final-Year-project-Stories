const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db.js");
//database connection
connect();
//removing the cors error
app.use(cors());
//routers
const AuthRoute = require("./Routers/api/auth");

//defining the body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//testing the route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Backend running" });
});

//defining the apis connection
app.use(
  "/api/auth",
  require("./Routers/api/auth")
);
app.use(
  "/api/user",
  require("./Routers/api/user")
);
//server listen response
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
