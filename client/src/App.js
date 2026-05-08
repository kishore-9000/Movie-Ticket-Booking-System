import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

function App() {
  const movies = [
    { title: 'Interstellar', year: 2014, rating: '8.7' },
    { title: 'Inception', year: 2010, rating: '8.8' },
    { title: 'Avengers Endgame', year: 2019, rating: '8.4' }
  ];

  return (
    <div className="bg-dark text-light min-vh-100">
      <nav className="navbar navbar-dark bg-black px-4">
        <h2 className="text-danger">Movie Ticket Booking</h2>
      </nav>

      <section className="hero-section text-center d-flex align-items-center justify-content-center">
        <div>
          <h1 className="display-4 fw-bold">Trending Now</h1>
          <p>Book tickets for the latest movies instantly.</p>
          <button className="btn btn-danger btn-lg">Book Now</button>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {movies.map((movie, index) => (
            <div className="col-md-4" key={index}>
              <div className="card bg-secondary text-light movie-card">
                <div className="card-body">
                  <h4>{movie.title}</h4>
                  <p>Year: {movie.year}</p>
                  <p>Rating: ⭐ {movie.rating}</p>
                  <button className="btn btn-outline-light">Book Seat</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
