const express = require("express");
const { UserModel } = require("../modles/user.model");
const { BlackListModel } = require("../modles/blacklist.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { username, email, pass, city, age, gender } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      try {
        if (hash) {
          const user = new UserModel({
            username,
            email,
            pass: hash,
            city,
            age,
            gender,
          });
          await user.save();
          res.status(200).send({ msg: "new user created succesfully", user });
        } else {
          res.status(200).send({ msg: "something went wrong" });
        }
      } catch (err) {
        res.status(400).send({ msg: "User is already registerd" });
      }
    });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      const token = jwt.sign(
        { userID: user._id, author: user.username },
        "abhay",
        { expiresIn: "7d" }
      );
      const refreshToken = jwt.sign(
        { userID: user._id, author: user.username },
        "gaikwad",
        { expiresIn: "30d" }
      );
      res.cookie = { token };
      if (result) {
        res.status(200).send({ msg: "Login Successful", token, refreshToken });
      } else {
        res.status(400).send({ msg: "something went wrong" });
      }
    });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});


userRouter.get("/logout", async (req, res) => {
  // const {token} = req.headers.authorization?.split(" ")[1]
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    const blackToken = new BlackListModel({ token });
    await blackToken.save();
    res.status(200).send({ msg: "Logout Successful...!" });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

module.exports = {
  userRouter,
};
