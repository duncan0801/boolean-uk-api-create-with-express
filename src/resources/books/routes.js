const express = require("express");
const { createNewBook, viewAllBooks, viewOneBook } = require("./controller")

const booksRouter = express.Router();

booksRouter.get("/", viewAllBooks);

booksRouter.get("/:id", viewOneBook);

booksRouter.post("/", createNewBook);

module.exports = booksRouter;
