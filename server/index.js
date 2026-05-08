const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const movies = [
  {
    id: 1,
    title: 'Interstellar',
    timing: '6:00 PM',
    theatre: 'PVR Cinemas'
  }
];

app.get('/api/movies', (req, res) => {
  res.json(movies);
});

app.post('/api/book', (req, res) => {
  const { movie, seat } = req.body;

  res.json({
    success: true,
    message: `Seat ${seat} booked for ${movie}`
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
