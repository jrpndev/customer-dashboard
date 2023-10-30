
const express = require('express');
const router = express.Router();

router.get('/:db', (req, res) => {
  const db = req.params.db;
  const connection = db === 'db1' ? connection1 : connection2;

  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Failed to fetch customers' });
    } else {
      res.json(results);
    }
  });
});

router.get('/:db/:id', (req, res) => {
  const db = req.params.db;
  const customerId = req.params.id;
  const connection = db === 'db1' ? connection1 : connection2;

  connection.query('SELECT * FROM customers WHERE id = ?', customerId, (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Failed to fetch customer' });
    } else {
      res.json(results[0]);
    }
  });
});

router.post('/:db', (req, res) => {
  const db = req.params.db;
  const { id, name } = req.body;
  const connection = db === 'db1' ? connection1 : connection2;

  connection.query('INSERT INTO customers (id, name) VALUES (?, ?)', [id, name], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Failed to add customer' });
    } else {
      res.status(201).json({ id, name });
    }
  });
});

router.delete('/:db/:id', (req, res) => {
  const db = req.params.db;
  const customerId = req.params.id;
  const connection = db === 'db1' ? connection1 : connection2;

  connection.query('DELETE FROM customers WHERE id = ?', customerId, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Failed to delete customer' });
    } else {
      res.json({ message: 'Customer deleted' });
    }
  });
});

router.patch('/:db/:id', (req, res) => {
  const db = req.params.db;
  const customerId = req.params.id;
  const newName = req.body.name;
  const connection = db === 'db1' ? connection1 : connection2;

  connection.query('UPDATE customers SET name = ? WHERE id = ?', [newName, customerId], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Failed to update customer' });
    } else {
      res.json({ message: 'Customer updated' });
    }
  });
});

module.exports = router;
