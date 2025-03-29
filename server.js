const express = require("express")
const app = express()
app.use(express.json())

const Banco = require('./banco')
const banco = new Banco()

const pedidos = []

app.get('/pedidos', (req, res) => {
    res.send(pedidos)
})

app.post('/pedidos', (req, res) => {
    pedidos.push(req.body)
    return res.json(pedidos)
    const pedido = {
        
    }
})

app.listen(3333, () => {
    console.log("Servidor on")
  })