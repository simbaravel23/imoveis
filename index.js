const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Configurações do banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'simba123',
  database: 'imoveis'
});

// Middleware para receber dados no formato JSON
app.use(express.json());

// Rota para ler dados
app.get('/imoveis', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM imoveis');
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
});

// Rota para inserir dados
app.post('/imoveis', async (req, res) => {
  const { codigo, bairro, valor } = req.body;

  try {
    const [result] = await pool.query('INSERT INTO imoveis (codigo, bairro, valor) VALUES (?, ?, ?)', [codigo, bairro, valor]);
    res.status(201).json({ message: 'Imóvel inserido com sucesso', id: result.insertId });
  } catch (error) {
    console.error('Erro ao inserir imóvel:', error);
    res.status(500).json({ error: 'Erro ao inserir imóvel' });
  }
});

// Rota para deletar dados
app.delete('/dados/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM imoveis WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Imóvel não encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar imóvel:', error);
        res.status(500).json({ error: 'Erro ao deletar imóvel' });
    }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});