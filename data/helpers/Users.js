const db = require("../dbConfig");

module.exports = {
  create,
  find,
  findById,
  findBy
};

function create(user) {
  return db("users").insert(user);
}

function find() {
  return db("users");
}

function findBy(param) {
  return db("users")
    .where(param)
    .first();
}

function findById(id) {
  return db("users").where({ id });
}
