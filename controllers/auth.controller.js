require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 3,
  });
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res
        .status(400)
        .send({ message: "User with that email already exists" });

    user = await User.create(req.body);

    // we will create the token for the user
    const token = newToken(user);

    // return the token and the user details
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    // first we will find the user with the email
    let user = await User.findOne({ email: req.body.email });

    // if user is not found then throw an error 400 Bad Request
    if (!user)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    // if user found then try to match the password provided with the password in db
    const match = user.checkPassword(req.body.password);

    // if not match then throw an error 400 Bad Request
    if (!match)
      return res
        .status(400)
        .send({ message: "Either Email or Password is incorrect" });

    const token = newToken(user);

    // return the token and the user details
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { register, login };
