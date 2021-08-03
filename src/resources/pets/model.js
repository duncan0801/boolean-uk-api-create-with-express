const dbClient = require("./../../utils/database");

function Pet() {
	function createTable() {
		const sql = `
            CREATE TABLE IF NOT EXISTS pets (
                id        SERIAL        PRIMARY KEY,
                name      VARCHAR(255)   NOT NULL,
                age       INTEGER       NOT NULL,
                type      VARCHAR(255)   NOT NULL,
                breed     VARCHAR(255)   NOT NULL,
                microchip BOOLEAN       NOT NULL
            );
        `;

		dbClient
			.query(sql)
			.then((result) => {
				console.log("You have sucessully created a pet table");
			})
			.catch((error) => {
				console.error("Here lies an error message ", error);
			});
	}
	function findAll(callback) {
		const sql = `
            SELECT * FROM pets
        `;

		dbClient
			.query(sql)
			.then((result) => {
				callback(result.rows);
			})
			.catch((error) => {
				console.error("There was an error", error);
			});
	}
	function findOne(requestedId, callback) {
		const sql = `
            SELECT * from pets
            WHERE id = ($1)
        `;

		dbClient
			.query(sql, [requestedId])
			.then((result) => {
				callback(result.rows[0]);
			})
			.catch((error) => console.error(error));
	}
	function createOnePet(newPet, callback) {
		const { name, age, type, breed, microchip } = newPet;

		const sql = `
            INSERT INTO pets (name, age, type, breed, microchip)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

		dbClient
			.query(sql, [name, age, type, breed, microchip])
			.then((result) => {
				callback(result.rows[0]);
				console.log("Here are the new pets in the database ", result);
			});
	}

	createTable();

	return {
		createOnePet,
		findOne,
		findAll,
	};
}

module.exports = Pet;
