CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);

CREATE TABLE movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  release_year INT,
  director VARCHAR(255),
  revenue BIGINT
);

CREATE TABLE theatres (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  location VARCHAR(255),
  total_seats INT
);

CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  movie_id INT,
  seat_number VARCHAR(10),
  booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
