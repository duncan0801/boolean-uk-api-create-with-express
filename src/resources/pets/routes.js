const express = require("express")
const Pet = require("./model")

const petsRouter = express.Router()
const { createOnePet } = Pet()

petsRouter.get("/", (req, res) => {

})

petsRouter.get("/:id", (req, res) => {
    
})

petsRouter.post("/", (req, res) => {
    const newPet = req.body;
	createOnePet(newPet, (resp) => {
		res.json({ pet: resp });
	});
})

module.exports = petsRouter