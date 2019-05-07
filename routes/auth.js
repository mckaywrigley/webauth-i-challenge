const express = require("express");
const bcrypt = require("bcryptjs");
const restricted = require("../middleware/restricted");

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
  const { username, password } = req.body;
  Users.findBy({ username })
    .then(user => {
      console.log(user);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Incorrect credentials" });
      }
      req.session.user = user;
      return res.status(200).json({ message: `Hello ${user.username}!` });
    })
    .catch(err => {
      return res.status(500).json({ error: "Error while logging in." });
    });
});

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json({ error: "Could not retrieve users." });
    });
});

module.exports = router;
