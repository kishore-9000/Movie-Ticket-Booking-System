import React, { useState, useEffect } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings');
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <h2 className="mb-4 fw-bold">My <span className="text-danger">Bookings</span></h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="alert alert-info" role="alert">
            No bookings found. <a href="/movies" className="alert-link">Book a ticket now!</a>
          </div>
        ) : (
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card bg-secondary h-100">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{booking.movie_title}</h5>
                    <p className="card-text">
                      <small className="text-muted">Booking ID:</small><br />
                      <code>{booking.id}</code>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Seats:</small><br />
                      <strong>{booking.seat_number}</strong>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Theatre:</small><br />
                      {booking.theatre}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Date:</small><br />
                      {new Date(booking.booking_time).toLocaleDateString()}
                    </p>
                    <button className="btn btn-danger btn-sm w-100">Download Ticket</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
