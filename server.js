import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// User registration
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO Usuarios (nombre_usuario, email, contraseña) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error registering user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM Usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error during login' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.contraseña);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user.usuario_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.usuario_id, email: user.email });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

// Get all books
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM Libros';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching books' });
    } else {
      res.json(results);
    }
  });
});

// Add a new book
app.post('/books', (req, res) => {
  const { titulo, autor, fecha_publicacion, categoria_id } = req.body;
  const query = 'INSERT INTO Libros (titulo, autor, fecha_publicacion, categoria_id) VALUES (?, ?, ?, ?)';
  db.query(query, [titulo, autor, fecha_publicacion, categoria_id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding book' });
    } else {
      res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
    }
  });
});

// Get all categories
app.get('/categories', (req, res) => {
  const query = 'SELECT * FROM Categorias';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching categories' });
    } else {
      res.json(results);
    }
  });
});

// Add a new category
app.post('/categories', (req, res) => {
  const { nombre_categoria } = req.body;
  const query = 'INSERT INTO Categorias (nombre_categoria) VALUES (?)';
  db.query(query, [nombre_categoria], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding category' });
    } else {
      res.status(201).json({ message: 'Category added successfully', categoryId: result.insertId });
    }
  });
});

// Create a new loan
app.post('/loans', (req, res) => {
  const { usuario_id, libro_id, fecha_prestamo } = req.body;
  const query = 'INSERT INTO Prestamos (usuario_id, libro_id, fecha_prestamo) VALUES (?, ?, ?)';
  db.query(query, [usuario_id, libro_id, fecha_prestamo], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error creating loan' });
    } else {
      res.status(201).json({ message: 'Loan created successfully', loanId: result.insertId });
    }
  });
});

// Get loans for a user
app.get('/loans/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM Prestamos WHERE usuario_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching loans' });
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});