const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3003; // Explicitly set port

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.resolve(__dirname, './data/db.db');
console.log(`Database path: ${dbPath}`);

// Check if the directory and file exist
if (!fs.existsSync(dbPath)) {
  console.error(`Database file not found at ${dbPath}`);
} else {
  console.log(`Database file found at ${dbPath}`);
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err.message);
  } else {
    console.log('Connected to the hospital database.');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS patient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nomcomplet TEXT NOT NULL,
  telephone TEXT NOT NULL,
  type TEXT NOT NULL,
  numero INTEGER NOT NULL
)`);

app.post('/add-patient', (req, res) => {
  const { nomcomplet, telephone, type } = req.body;

  db.get('SELECT MAX(numero) as maxNumero FROM patient', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const maxNumero = row.maxNumero || 0;
    const newNumero = maxNumero + 1;

    db.run(
      `INSERT INTO patient (nomcomplet, telephone, type, numero) VALUES (?, ?, ?, ?)`,
      [nomcomplet, telephone, type, newNumero],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.get('SELECT COUNT(*) as peopleBefore FROM patient WHERE numero < ?', [newNumero], (err, row) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(200).json({ 
            message: 'Patient added', 
            id: this.lastID, 
            numero: newNumero, 
            peopleBefore: row.peopleBefore, 
            nomcomplet, 
            telephone, 
            type 
          });
        });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Client Server is running on http://localhost:${PORT}`);
});
