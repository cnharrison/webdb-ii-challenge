const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove
};

function find() {
  return db("zoos");
}

function findById(id) {
  return db("zoos").where({ id: Number(id) });
}

function insert(animal) {
  return db("zoos")
    .insert(animal)
    .then(ids => ({ id: ids[0] }));
}

function update(id, animal) {
  return db("zoos")
    .where("id", Number(id))
    .update(animal);
}

function remove(id) {
  return db("zoos")
    .where("id", Number(id))
    .del();
}
