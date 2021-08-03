const Book = require("./model");

const { createOneBook, showTable, findBook } = Book();

const createNewBook = (req, res) => {
	const newBook = req.body;
    const reqKeys = Object.keys(newBook)
	
    const reqKeyValPairs = Object.entries(newBook)
    const requiredKeys = ["title", "type", "author", "topic", "publicationDate"]

    const acceptableRequest = reqKeyValPairs.every((keyValue, index) => {
        return requiredKeys.includes(keyValue[0]) && typeof keyValue[1] === "string" && reqKeys.length === [...new Set(reqKeys)].length
    })

    if(!acceptableRequest) {
        console.log("error, didn't pass check")
    }

    console.log(reqKeyValPairs)
	createOneBook(newBook, (resp) => {
		res.json({ book: resp });
	});
};

const viewAllBooks = (req, res) => {
	showTable((resp) => {
		res.json({ books: resp });
	});
};

const viewOneBook = (req, res) => {
	findBook(req.params.id, (resp) => {
		res.json({ book: resp });
	});
};

module.exports = { createNewBook, viewAllBooks, viewOneBook };
