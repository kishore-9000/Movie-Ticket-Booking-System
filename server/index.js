const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'movie_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
pool.getConnection()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));

// ==================== Movies Endpoints ====================

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [movies] = await connection.query('SELECT * FROM movies LIMIT 20');
    connection.release();

    // Add mock data if empty
    if (movies.length === 0) {
      return res.json([
        { id: 1, title: 'Interstellar', release_year: 2014, rating: '8.7', poster: 'https://via.placeholder.com/300x450?text=Interstellar' },
        { id: 2, title: 'Inception', release_year: 2010, rating: '8.8', poster: 'https://via.placeholder.com/300x450?text=Inception' },
        { id: 3, title: 'Avengers Endgame', release_year: 2019, rating: '8.4', poster: 'https://via.placeholder.com/300x450?text=Avengers' },
        { id: 4, title: 'The Dark Knight', release_year: 2008, rating: '9.0', poster: 'https://via.placeholder.com/300x450?text=Dark+Knight' },
        { id: 5, title: 'Pulp Fiction', release_year: 1994, rating: '8.9', poster: 'https://via.placeholder.com/300x450?text=Pulp+Fiction' },
        { id: 6, title: 'Forrest Gump', release_year: 1994, rating: '8.8', poster: 'https://via.placeholder.com/300x450?text=Forrest+Gump' },
      ]);
    }

    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ success: false, message: 'Error fetching movies' });
  }
});

// Get single movie
app.get('/api/movies/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [movies] = await connection.query('SELECT * FROM movies WHERE id = ?', [req.params.id]);
    connection.release();

    if (movies.length === 0) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }

    res.json(movies[0]);
  } catch (error) {
    console.error('Error fetching movie:', error);
    res.status(500).json({ success: false, message: 'Error fetching movie' });
  }
});

// ==================== Booking Endpoints ====================

// Create booking
app.post('/api/book', async (req, res) => {
  const { movieId, seats, theatre, showTime } = req.body;

  if (!movieId || !seats || seats.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid booking data' });
  }

  try {
    const connection = await pool.getConnection();

    for (const seat of seats) {
      await connection.query(
        'INSERT INTO bookings (movie_id, seat_number, theatre, show_time) VALUES (?, ?, ?, ?)',
        [movieId, seat, theatre || 'PVR Cinemas', showTime || '6:00 PM']
      );
    }

    connection.release();
    res.json({ success: true, message: `Booked ${seats.length} seats successfully` });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Booking failed' });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [bookings] = await connection.query(`
      SELECT b.*, m.title as movie_title 
      FROM bookings b 
      LEFT JOIN movies m ON b.movie_id = m.id 
      ORDER BY b.booking_time DESC
    `);
    connection.release();

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// ==================== User Endpoints ====================

// User signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password] // Note: In production, hash the password!
    );
    connection.release();

    res.json({ 
      success: true, 
      message: 'Signup successful', 
      user: { name, email } 
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    res.json({ 
      success: true, 
      message: 'Login successful', 
      user: { id: user.id, name: user.name, email: user.email } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

// ==================== Admin Endpoints ====================

// Add movie (admin)
app.post('/api/admin/movies', async (req, res) => {
  const { title, release_year, director, revenue } = req.body;

  try {
    const connection = await pool.getConnection();
    const result = await connection.query(
      'INSERT INTO movies (title, release_year, director, revenue) VALUES (?, ?, ?, ?)',
      [title, release_year, director, revenue]
    );
    connection.release();

    res.json({ success: true, message: 'Movie added', movieId: result[0].insertId });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ success: false, message: 'Failed to add movie' });
  }
});

// ==================== Health Check ====================

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ==================== Start Server ====================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
