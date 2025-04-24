const express = require("express")
const cors = require("cors")
const crypto = require('crypto');
const app = express()
app.use(cors())
app.use(express.json())

const Banco = require('./banco')
const banco = new Banco()

app.use(cors())

app.get('/pedidos/:id?', async (req, res) => {
    const { id } = req.params

    if(id) {
    const pos = await banco.consult(id)
    if(!pos) {
        return res.json({mensage: "Pedido não encontrado"})
    } 
    return res.json(pos)
    }
    const lista = await banco.listar()
    return res.json(lista)
})
app.get('/pedidos/data/:data_entrega', async (req, res) => {
    const { data_entrega } = req.params
    if(data_entrega) {
     const pos = await banco.consultData(data_entrega)
      if(!pos) {
         return res.json({mensage: "Pedido não encontrado"})
        } 
         return res.json(pos)
        }
            
    const lista = await banco.listar()
    return res.json(lista)
})


app.post('/pedidos', (req, res) => {
    const { nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs } = req.body
    const uuid = crypto.randomUUID();
    const pedido = {
    uuid,
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
  return res.json(pedido)
})

app.delete('/pedidos/:id', async (req, res) => {
    const { id } = req.params
    const pos = await banco.consult(id)
    if(!pos) {
        return res.json({mensage: "Pedido não encontrado"})
    }

    banco.remover(id)
    return res.json({mensage: "Pedido removido com sucesso"})
})

app.put('/pedidos/:id', async (req, res) => {
    const { id } = req.params
    const { nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs } = req.body
    const pedido = {
        id,
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

    const pos = await banco.consult(id)
    if(!pos) {
        return res.json({mensage: "Pedido não encontrado"})
    }
    banco.atualizar(pedido)
    return res.json({mensage: "Pedido atualizado com sucesso"})
})


app.listen(3333, () => {
    console.log("Servidor on")
  })
