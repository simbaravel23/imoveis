const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Configurações do banco de dados (substitua pelos seus dados)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'simba123',
    database: 'imoveis'
});

// Middleware para receber dados no formato JSON
app.use(express.json());

// Rota para ler dados
app.get('/dados', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM imoveis1');
        res.json(rows);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Rota para inserir dados
app.post('/dados', async (req, res) => {
    const { codigo, bairro, valor } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO imoveis1 (codigo, bairro, valor) VALUES (?, ?, ?)', [nome, valor]);
        res.json({ message: 'Dados inseridos com sucesso', id: result.insertId });
    } catch (error) {
        console.error('Erro ao inserir dados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () => {
    console.log(`Servidor ouvindo na porta ${port}`);
});
