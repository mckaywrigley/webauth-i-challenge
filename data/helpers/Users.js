const db = require("../dbConfig");

module.exports = {
  create,
  find,
  findById
};

function create(user) {
  return db("users").insert(user);
}

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users").where({ id });
}
