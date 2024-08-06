import express from "express"
import cors from "cors"

// app config
const app = express()   // initialize our app using express
const port = 4000       // define port # where server will run

// initialize middleware
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})