require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err))

app.use("/api/auth", require("./routes/auth"))
app.use("/api/tasks", require("./routes/tasks"))

app.listen(5000, () => console.log("Servidor rodando na porta 5000"))

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./swagger")

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))