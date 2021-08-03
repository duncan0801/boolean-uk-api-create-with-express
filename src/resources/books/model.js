const dbClient = require("../../utils/database");

function Book() {
	function createTable() {
		const sql = ` 
        CREATE TABLE IF NOT EXISTS books (
          id              SERIAL        PRIMARY KEY,
          title           VARCHAR(255)   NOT NULL,
          type            VARCHAR(255)   NOT NULL,
          author          VARCHAR(255)   NOT NULL,
          topic           VARCHAR(255)   NOT NULL,
          publicationDate DATE           NOT NULL
        )
		;
      `;
		dbClient.query(sql).then((result) => {});
	}

	function showTable(callback) {
		const sql = `
	        SELECT * FROM books;
	    `;
		dbClient.query(sql).then((result) => {
			callback(result.rows)
			console.log("here is the result from the server??? ", result);
		});
	}

	function findBook(requestedId, callback) {
		const sql = `
			SELECT * FROM books
			WHERE id = ($1);
		`
		dbClient.query(sql, [requestedId]).then((result)=>{
			callback(result.rows[0])
		}).catch((error)=>{
			console.log("Houston we have a problem ", error)
		})
	}

	function createOneBook(newBook, callback) {
		const { title, type, author, topic, publicationDate } = newBook;

		const sql = `
            INSERT INTO books (
                title, type, author, topic, publicationDate
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
		dbClient
			.query(sql, [title, type, author, topic, publicationDate])
			.then((result) => {
				callback(result.rows[0]);
				console.log("You have created a book:", result.rows[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	createTable();

	return {
		createOneBook,
		showTable,
		findBook
	};
}

module.exports = Book;
