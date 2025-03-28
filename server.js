const express = require("express")
const app = express()
app.use(express.json())

const pedidos = []

app.get('/pedidos', (req, res) => {
    res.send(pedidos)
})

app.post('/pedidos', (req, res) => {
    pedidos.push(req.body)
    return res.json(pedidos)
})

app.listen(3333, () => {
    console.log("Servidor on")
  })