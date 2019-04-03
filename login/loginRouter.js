const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const Users = require("../users/users-model.js");
const jwt = require("jsonwebtoken");
const secret = require("../api/secrets").jwtSecret;

const db = knex(knexConfig.development);
const router = express.Router();

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: ["student", "staff", "instructor", "TA", "PM", "marketing"]
  };
  const options = {
    expiresIn: "1m"
  };
  return jwt.sign(payload, secret, options);
}

router.post("/", async (req, res) => {
  let { username, password, department } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: `Bad request, Must provide Details!` });
  } else {
    try {
      let user = await Users.findBy({ username }).first();
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: `You shall not pass!` });
      }
    } catch (err) {
      res.status(500).json({ message: `Internal Error, ${err}` });
    }
  }
});

module.exports = router;
