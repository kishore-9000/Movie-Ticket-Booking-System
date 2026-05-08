import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/movies');
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100">
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center position-relative">
        <div className="hero-overlay"></div>
        <div className="hero-content text-center position-relative z-3">
          <h1 className="display-3 fw-bold mb-3 text-white">Book Your Movie Tickets Online</h1>
          <p className="lead mb-4 text-light">Experience cinema like never before</p>
          <Link to="/movies" className="btn btn-danger btn-lg">
            Explore Movies
          </Link>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">
            <span className="text-danger">Now Showing</span>
          </h2>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {movies.slice(0, 8).map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-dark border-top border-danger">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Why Choose Us?</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4">
                <h3 className="text-danger mb-3">🎫 Easy Booking</h3>
                <p>Book your tickets in just a few clicks</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4">
                <h3 className="text-danger mb-3">💳 Secure Payment</h3>
                <p>Safe and encrypted transactions</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-box p-4">
                <h3 className="text-danger mb-3">🎬 Latest Movies</h3>
                <p>Access to all the latest blockbusters</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
