const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Banco de dados simulado em memória
let usuarios = [];

// Rota para cadastrar novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: 'Nome e email são obrigatórios.' });
  }

  const novoUsuario = { id: usuarios.length + 1, nome, email };
  
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});