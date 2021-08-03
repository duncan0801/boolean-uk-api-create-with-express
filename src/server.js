const express = require("express")
const morgan = require("morgan")
const dbClient = require("./utils/database")

const booksRouter = require("./resources/books/routes")
const petsRouter = require("./resources/pets/routes")

const app = express()
const port = 4002

//MIDDLEWARE
app.use(morgan("dev"))
app.use(express.json())

app.use("/books", booksRouter)
app.use("/pets", petsRouter)


app.get("*", (req, res) => {
    res.json({msg: "hello"})
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    dbClient.connect((error) => {
        if (error) {
            console.error("there was an error if you can be bothered to check " , error)
        }else {
            console.log("Database is fully connected")
        }
    })
})

