const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON data

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

app.post('/submit-form', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO users (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'An error occurred while inserting data into the database' });
    }

    return res.status(200).json({ message: 'User data inserted successfully' });
           
  });
});

app.get('/', (req, res) => {
  return res.json('form backend side');
});

app.listen(8081, () => {
  console.log('Server listening on port 8081');
});
