const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

class Banco {

    constructor() {
        this.criarTabela()
    }

    async sqlConnection(){
        const banco = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
        })
    
        return banco;
    }
    async criarTabela(){
        const banco = await this.sqlConnection();
    
    const tabela = `CREATE TABLE IF NOT EXISTS Pedidos (
                     id integer PRIMARY KEY AUTOINCREMENT,
                     nome varchar (100),
                     data date,
                     contato int(10),
                     tamanho varchar(4),
                     quantidade int(3),
                     data_entrega date,
                     escola varchar(100),
                     pagamento varchar(15),
                     tipo_pedido varchar(11),
                     superior varchar(10),
                     inferior varchar(10),
                     obs varchar (100)

    );`;
    await banco.exec(tabela)
 }
 async inserir(pedido){
    const { nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs } = pedido
     const banco = await this.sqlConnection();
     await banco.run("INSERT INTO Pedidos ( nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs) values ( ?, ?, ?, ? , ?, ?, ? , ?, ?, ?, ?, ?)", nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs)
}
async listar(){
    const banco = await this.sqlConnection();
    const result = await banco.all("SELECT * FROM pedidos")
    return result 
}
async remover(id){
    const banco = await this.sqlConnection();
    await banco.run("DELETE FROM pedidos WHERE id=?", id)
}
async consult(id){
    const banco = await this.sqlConnection();
    const result = await banco.get("SELECT * FROM pedidos WHERE id = ?", id)
    return result 
}
async atualizar(pedido){
    const { nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs, id } = pedido
    const banco = await this.sqlConnection();
    await banco.run("UPDATE pedidos SET nome=?, data=?, contato=?, tamanho=?, quantidade=?, data_entrega=?, escola=?, pagamento=?, tipo_pedido=?, superior=?, inferior=?, obs=? WHERE id=?", nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs, id)
}

}



module.exports = Banco;