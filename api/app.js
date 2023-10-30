const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.json());

const connection1 = mysql.createConnection({
  host: process.env.DB_HOST_1,
  user: 'root',
  password: process.env.DB_PASSWORD_1,
  database: process.env.DB_NAME_1
});

const connection2 = mysql.createConnection({
  host: process.env.DB_HOST_2,
  user: 'root',
  password: process.env.DB_PASSWORD_2,
  database: process.env.DB_NAME_2
});

connection1.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados 1:', err);
    return;
  }
  console.log('Conectado ao banco de dados 1.');
});

connection2.connect((err) => {
  if (err) {
    console.error('Erro ao conectar com o banco de dados 2:', err);
    return;
  }
  console.log('Conectado ao banco de dados 2.');
});

const customersRouter = require('./routes/customers');
app.use('/customers', customersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
