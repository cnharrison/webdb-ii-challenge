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

const find = () => db("posts");

const findById = id => db("posts").where({ id: Number(id) });

const insert = post =>
  db("posts")
    .insert(post)
    .then(ids => ({ id: ids[0] }));

const update = (id, post) =>
  db("posts")
    .where("id", Number(id))
    .update(post);

const remove = id =>
  db("posts")
    .where("id", Number(id))
    .del();
