const Pet = require("./model")

const { createOnePet, findOne, findAll } = Pet()

function createOne (req, res) {
    const newPet = req.body;
	createOnePet(newPet, (resp) => {
		res.json({ pet: resp });
	});
}
function findOnePet(req, res) {
    findOne(req.params.id, resp => {
        res.json({Pet: resp})
    })
}

function findAllPets(req, res) {
    findAll(resp => {
        res.json({Pets: resp})
    })
}

module.exports = {createOne, findOnePet, findAllPets}