const express = require("express");
const knex = require("knex");
const bcrypt = require("bcryptjs");
const knexConfig = require("../knexfile.js");
const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets.js");
const Users = require("./users-model.js");

const db = knex(knexConfig.development);
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const newUser = await Users.find();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
});

async function restricted(req, res, next) {
  const token = req.headers.authorization;
  try {
    if (token) {
      jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({ message: `Invalid Credentials` });
        } else {
          req.decodedJwt = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({ message: `You shall not pass!` });
    }
  } catch (err) {
    res.status(500).json({ message: `Internal Error, ${err}` });
  }
}

module.exports = router;
