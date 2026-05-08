import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Booking() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [theatre, setTheatre] = useState('PVR Cinemas');
  const [showTime, setShowTime] = useState('6:00 PM');
  const [loading, setLoading] = useState(false);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          movieId,
          seats: selectedSeats,
          theatre,
          showTime,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Booking confirmed! Check your email for confirmation.');
        navigate('/bookings');
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Error processing booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <div className="container">
        <h2 className="mb-4 fw-bold">Select Your <span className="text-danger">Seats</span></h2>

        <div className="row">
          {/* Seat Selection */}
          <div className="col-lg-8">
            <div className="card bg-secondary">
              <div className="card-body">
                <div className="text-center mb-4">
                  <p className="text-muted">Screen</p>
                  <div className="screen-graphic">█████████████████████</div>
                </div>

                {/* Seat Grid */}
                <div className="seat-grid mx-auto" style={{ width: 'fit-content' }}>
                  <div className="mb-3">
                    {rows.map((row) => (
                      <div key={row} className="seat-row d-flex justify-content-center mb-2">
                        <span className="me-3 mt-2" style={{ minWidth: '30px' }}>
                          {row}
                        </span>
                        {cols.map((col) => (
                          <button
                            key={`${row}${col}`}
                            className={`seat-btn m-1 ${
                              selectedSeats.includes(`${row}${col}`)
                                ? 'selected'
                                : ''
                            }`}
                            onClick={() => handleSeatClick(`${row}${col}`)}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 d-flex justify-content-center gap-4 text-muted">
                  <div>
                    <span className="badge bg-danger me-2">■</span> Selected
                  </div>
                  <div>
                    <span className="badge bg-secondary me-2">■</span> Available
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="col-lg-4">
            <div className="card bg-secondary sticky-top">
              <div className="card-body">
                <h5 className="card-title text-danger mb-3">Booking Summary</h5>

                <div className="mb-3">
                  <label className="form-label">Theatre</label>
                  <select
                    className="form-select bg-dark text-light border-danger"
                    value={theatre}
                    onChange={(e) => setTheatre(e.target.value)}
                  >
                    <option>PVR Cinemas</option>
                    <option>INOX</option>
                    <option>Cinepolis</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Show Time</label>
                  <select
                    className="form-select bg-dark text-light border-danger"
                    value={showTime}
                    onChange={(e) => setShowTime(e.target.value)}
                  >
                    <option>10:30 AM</option>
                    <option>2:00 PM</option>
                    <option>6:00 PM</option>
                    <option>9:30 PM</option>
                  </select>
                </div>

                <hr />

                <div className="mb-3">
                  <p className="text-muted">Selected Seats:</p>
                  <p className="text-danger fw-bold">
                    {selectedSeats.length > 0
                      ? selectedSeats.join(', ')
                      : 'No seats selected'}
                  </p>
                </div>

                <div className="mb-3">
                  <p>Price per Seat: <span className="text-danger">₹250</span></p>
                  <h4>Total: <span className="text-danger">₹{selectedSeats.length * 250}</span></h4>
                </div>

                <button
                  className="btn btn-danger w-100 fw-bold"
                  onClick={handleBooking}
                  disabled={loading || selectedSeats.length === 0}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
