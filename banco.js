const mysql = require('mysql2/promise');

class Banco {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Pedro32@_84',
            database: 'mysql',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async inserir(pedido) {
        const { uuid, nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs } = pedido;
        await this.pool.execute(
            `INSERT INTO pedidos (uuid, nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [uuid, nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs]
        );
    }
 
    async listar() {
        const [rows] = await this.pool.execute('SELECT * FROM pedidos');
        return rows;
    }

    async remover(id) {
        await this.pool.execute('DELETE FROM pedidos WHERE id = ?', [id]);
    }

    async consult(id) {
        const [rows] = await this.pool.execute('SELECT * FROM pedidos WHERE id = ?', [id]);
        return rows[0];
    }

    async consultData(data_entrega) {
        const [rows] = await this.pool.execute('SELECT * FROM pedidos WHERE data_entrega = ?', [data_entrega]);
        return rows;
    }

    async atualizar(pedido) {
        const { nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs, id } = pedido;
        await this.pool.execute(
            `UPDATE pedidos SET nome=?, data=?, contato=?, tamanho=?, quantidade=?, data_entrega=?, escola=?, pagamento=?, tipo_pedido=?, superior=?, inferior=?, obs=? 
             WHERE id=?`,
            [nome, data, contato, tamanho, quantidade, data_entrega, escola, pagamento, tipo_pedido, superior, inferior, obs, id]
        );
    }
}

module.exports = Banco;
