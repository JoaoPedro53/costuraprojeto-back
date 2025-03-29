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
    const { nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs } = req.body
    const pedido = {
    nome,
    data,
    contato,
	tamanho,
	quantidade,
	data_entrega,
	escola,
	pagamento,
	tipo_pedido,
	superior,
	inferior,
	obs
    }
  banco.inserir(pedido)
  pedidos.push(pedido)
  return res.json(pedido)
})

app.delete('/pedidos/:id', async(req, res) => {
    const {id} = req.params
    console.log(id)

    return res.json({mensage: "Removido com sucesso"})
})

app.put('pedidos/:id', (req, res) => {
    const {id} = req.params
    console.log(id)

    return res.json({mensage: "Atualizado com sucesso"})
})


app.listen(3333, () => {
    console.log("Servidor on")
  })
