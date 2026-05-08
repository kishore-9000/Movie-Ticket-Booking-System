import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card bg-dark text-light movie-card h-100 shadow-lg">
        <div className="movie-poster-container">
          <img
            src={movie.poster || 'https://via.placeholder.com/300x450?text=' + movie.title}
            className="card-img-top movie-poster"
            alt={movie.title}
          />
          <div className="movie-overlay">
            <Link to={`/movie/${movie.id}`} className="btn btn-danger btn-sm">
              View Details
            </Link>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title text-truncate">{movie.title}</h5>
          <p className="card-text text-muted small">{movie.release_year}</p>
          <div className="d-flex justify-content-between">
            <span className="badge bg-warning text-dark">⭐ {movie.rating || '8.5'}</span>
            <Link
              to={`/book/${movie.id}`}
              className="btn btn-outline-danger btn-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
