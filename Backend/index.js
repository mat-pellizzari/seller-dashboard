const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors");
const loginRouter = require("./routes/login.routes")
const produtoRouter = require("./routes/produtos.routes")
const vendasRouter = require("./routes/vendas.routes")
const horarioRouter = require("./routes/horarios.routes")
const metaRouter = require("./routes/meta.routes")
const app = express()
const port = 3000
require("dotenv").config()

app.use(cors());
app.use(express.json())
app.use("/auth", loginRouter)
app.use("/horario", horarioRouter)
app.use("/produtos", produtoRouter)
app.use("/vendas", vendasRouter)
app.use("/meta", metaRouter)

app.listen(port, () => {
    console.log(`app listening on port http://localhost:${port}`)
})

const connectionString = process.env.CONNECT_STRING
mongoose.connect(connectionString)
    .then(() => console.log("conectado ao mongoDB"))
    .catch((error) => console.log(error))