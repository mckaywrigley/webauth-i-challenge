const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../data/helpers/Users");

const router = express.Router();

router.post("/register", (req, res) => {
  let user = req.body;
  let hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.create(user)
    .then(user => {
      return res.json(201).json(user);
    })
    .catch(err => {
      return res.json(500).json({ error: "Could not register the user." });
    });
});

router.post("/login", (req, res) => {
  let credentials = req.body;
  if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
    return res.status(401).json({ error: "Incorrect credentials." });
  }
  return res.status(200).json({ success: "Correct credentials." });
});

router.get("/users", (req, res) => {});

module.exports = router;
