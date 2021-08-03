const { Client } = require("postgress")

const PGURL = process.env.PGURL

const dbClient = new Client()

module.exports = dbClient