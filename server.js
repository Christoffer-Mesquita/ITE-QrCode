const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const dbPath = path.join(__dirname, 'db', 'database.json');

const readDB = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.get('/etapa1', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'etapa1.html'));
});

app.get('/etapa2', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'etapa2.html'));
});

app.get('/final', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'final.html'));
});

app.post('/submit', (req, res) => {
  const { ra, nome, curso } = req.body;

  const db = readDB();
  db.participantes.push({ ra, nome, curso });

  writeDB(db);

  res.sendFile(path.join(__dirname, 'views', 'agradecimento.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
