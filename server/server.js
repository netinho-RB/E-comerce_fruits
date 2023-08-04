const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;

async function connectToDB() {
  try {
    const uri = 'mongodb://localhost:27017'; // URL de conexão do MongoDB
    const dbName = 'meu_banco_de_dados'; // Nome do banco de dados
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

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

  // ...

const { MongoClient } = require('mongodb');

// ...

async function connectToDB() {
  try {
    const uri = 'mongodb://localhost:27017'; // URL de conexão do MongoDB
    const dbName = 'meu_banco_de_dados'; // Nome do banco de dados
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

// ...

app.post('/api/frutas', async (req, res) => {
  try {
    const novaFruta = {
      nome: req.body.nome,
      preco: parseFloat(req.body.preco)
    };

    const db = await connectToDB(); // Estabelece conexão com o banco de dados
    const frutasCollection = db.collection('frutas'); // Acessa a coleção de frutas
    await frutasCollection.insertOne(novaFruta); // Insere a nova fruta no banco

    res.status(201).json({ message: 'Fruta cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar fruta:', error);
    res.status(500).json({ error: 'Erro ao cadastrar fruta' });
  }
});

// ...


// Rota para cadastrar uma nova fruta
app.post('/api/frutas', async (req, res) => {
  try {
    const novaFruta = {
      nome: req.body.nome,
      preco: parseFloat(req.body.preco)
    };

    const db = await connectToDB(); // Estabelece conexão com o banco de dados
    const frutasCollection = db.collection('frutas'); // Acessa a coleção de frutas
    await frutasCollection.insertOne(novaFruta); // Insere a nova fruta no banco

    res.status(201).json({ message: 'Fruta cadastrada com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar fruta:', error);
    res.status(500).json({ error: 'Erro ao cadastrar fruta' });
  }
});
