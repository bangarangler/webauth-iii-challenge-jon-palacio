const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const Users = require("../users/users-model.js");
const jwt = require("jsonwebtoken");
const secret = require("../api/secrets.js").jwtSecret;

const db = knex(knexConfig.development);
const router = express.Router();

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ["student", "staff", "instructor", "marketing", "TA", "PM"]
  };
  const options = {
    expiresIn: "10m"
  };
  return jwt.sign(payload, secret, options);
}

router.post("/", async (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 6);
  user.password = hash;
  const newUser = await Users.add(user);
  try {
    const token = generateToken(newUser);
    res.status(201).json({ newUser, token });
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

module.exports = router;
