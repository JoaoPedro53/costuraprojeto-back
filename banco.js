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
}}


module.exports = Banco;