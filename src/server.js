const express = require("express")
const morgan = require("morgan")

const app = express()
const port = 3035

//MIDDLEWARE
app.use(morgan("dev"))
app.use(express.json())

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`)
})

