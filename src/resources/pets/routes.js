const express = require("express");
const petsRouter = express.Router();
const { createOne, findOnePet, findAllPets } = require("./controller");

petsRouter.get("/", findAllPets);

petsRouter.get("/:id", findOnePet);

petsRouter.post("/", createOne);

module.exports = petsRouter;
