const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let usuarios = [];

app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: 'Nome e email são obrigatórios.' });
  }

  const novoUsuario = { id: usuarios.length + 1, nome, email };
  
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
  }

  if (nome) usuario.nome = nome;
  if (email) usuario.email = email;

  res.json(usuario);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
  }

  const usuarioRemovido = usuarios.splice(index, 1)[0];
  res.json({ mensagem: 'Usuário removido com sucesso.', usuario: usuarioRemovido });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});