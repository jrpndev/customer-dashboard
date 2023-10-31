import express from "express";
import mysql from "mysql";
import setupCustomerRoutes from "./controllers/customer.js";
import dotenv from "dotenv";

dotenv.config({ path: "/usr/src/app/.env" });

const app = express();

app.use(express.json());

const connection1 = mysql.createConnection({
  host: process.env.DB_HOST_1,
  user: process.env.DB_USER_1,
  password: process.env.DB_PASSWORD_1,
  database: process.env.DB_DATABASE_1,
});

const connection2 = mysql.createConnection({
  host: process.env.DB_HOST_2,
  user: process.env.DB_USER_2,
  password: process.env.DB_PASSWORD_2,
  database: process.env.DB_DATABASE_2,
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

app.use('/customers', setupCustomerRoutes(connection1, connection2));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
