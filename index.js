const express = require("express");
const helmet = require("helmet");

const db = require("./data/db.js");
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(
    `\nzoo api out here listening 🐺🐱🦒🦓🐒👌💯😂 http://localhost:${port} ===\n`
  );
});

server.post("/api/zoos", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the animal"
    });
  }
  db.insert({
    name
  })
    .then(addedAnimal => {
      res.status(201).json(addedAnimal);
    })
    .catch(err =>
      res.status(500).json({
        error: "There was an error while adding this mf animal to the mf zoo"
      })
    );
});

server.get("/api/zoos", (req, res) => {
  db.find()
    .then(animals => {
      res.json(animals);
    })
    .catch(err => res.status(500).send(err));
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(animal => {
      if (!animal) {
        res
          .status(404)
          .json({ message: "The animal with the specified ID is not at the zoo smh." });
      }
      res.status(201).json(post);
    })
    .catch(err =>
      res
        .status(500)
        .send({ error: "The animal could not be retrieved." })
    );
});

server.delete("/api/zoos/:id", async (req, res) => {
  try {
    const animalToDelete = await db.findById(req.params.id);
    const count = await db.remove(req.params.id);
    if (count > 0) {
      res.status(200).json(animalToDelete);
    } else {
      res
        .status(404)
        .json({ message: "The animal with the specified is not at the mf zoo" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "The animal could not be retrieved." });
  }
});

server.put("/api/zoos/:id", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      errorMessage: "Please provide a name for the animal"
    });
  }
  try {
    const count = await db.update(req.params.id, req.body);
    if (count === 1) {
      res.status(200).json(req.body);
    }
  } catch {
    res
      .status(404)
      .json({ error: "The animal could not be retrieved." });
  }
});
