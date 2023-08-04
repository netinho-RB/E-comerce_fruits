const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rota para obter o histórico de vendas
app.get('/api/historico', (req, res) => {
  try {
    const historico = JSON.parse(fs.readFileSync('../database/vendas.json', 'utf8'));
    res.json(historico);
  } catch (error) {
    console.error('Erro ao obter o histórico de vendas:', error);
    res.status(500).json({ error: 'Erro ao obter o histórico de vendas' });
  }
});

// Rota para obter o saldo do cliente
app.get('/api/cliente', (req, res) => {
  try {
    const cliente = JSON.parse(fs.readFileSync('../database/clientes.json', 'utf8'));
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao obter o saldo do cliente:', error);
    res.status(500).json({ error: 'Erro ao obter o saldo do cliente' });
  }
});

// Rota para cadastrar uma nova fruta
app.post('/api/frutas', (req, res) => {
  try {
    const novaFruta = {
      nome: req.body.nome,
      preco: parseFloat(req.body.preco)
    };

    const frutas = JSON.parse(fs.readFileSync('../database/frutas.json', 'utf8'));
    frutas.push(novaFruta);
    fs.writeFileSync('../database/frutas.json', JSON.stringify(frutas));

    res.status(201).json({ message: 'Fruta cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar fruta:', error);
    res.status(500).json({ error: 'Erro ao cadastrar fruta' });
  }
});

// Resto do código para iniciar o servidor (já existente)
