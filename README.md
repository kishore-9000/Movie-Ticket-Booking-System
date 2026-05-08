# 🎬 Movie Ticket Booking System

A modern, full-stack movie ticket booking platform with dark cinematic UI, interactive seat selection, secure authentication, and complete booking management.

![React](https://img.shields.io/badge/React-18+-blue) ![Node.js](https://img.shields.io/badge/Node.js-18+-green) ![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3+-purple)

## ✨ Features

### Frontend
- 🎨 Dark cinematic landing page with animations
- 🎥 Movie listing with search and filtering
- 🎫 Interactive seat selection grid
- 👤 User authentication (Login/Signup)
- 📋 Booking history management
- 📱 Fully responsive design
- ⚡ Smooth hover effects and transitions

### Backend
- 🔐 User authentication system
- 🎬 Movie management endpoints
- 🪑 Seat booking with conflict prevention
- 📦 RESTful API architecture
- 🗄️ MySQL database integration
- ✅ Error handling and validation

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, React Router, Bootstrap 5 |
| **Backend** | Express.js, Node.js |
| **Database** | MySQL 8.0+ |
| **Deployment** | Docker, Docker Compose |

## 📋 Project Structure

```
Movie-Ticket-Booking-System/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Navbar.js
│   │   │   └── MovieCard.js
│   │   ├── pages/             # Page components
│   │   │   ├── Home.js
│   │   │   ├── Movies.js
│   │   │   ├── Booking.js
│   │   │   ├── MyBookings.js
│   │   │   └── Login.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
├── server/                    # Express backend
│   ├── index.js
│   └── package.json
├── database/
│   └── schema.sql
├── Dockerfile
├── docker-compose.yml
├── DEPLOYMENT.md
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Local Development

1. **Clone and setup**
   ```bash
   git clone https://github.com/kishore-9000/Movie-Ticket-Booking-System.git
   cd Movie-Ticket-Booking-System
   ```

2. **Setup MySQL Database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. **Backend Setup**
   ```bash
   cd server
   npm install
   npm start
   # Server runs on http://localhost:5000
   ```

4. **Frontend Setup** (new terminal)
   ```bash
   cd client
   npm install
   npm start
   # App opens at http://localhost:3000
   ```

### Environment Variables

Create `.env` files with the following:

**server/.env**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=movie_booking
NODE_ENV=development
```

**client/.env**
```
REACT_APP_API_URL=http://localhost:5000
```

## 🐳 Docker Deployment

### Build and Run with Docker Compose
```bash
docker-compose up -d
```

This will start:
- MySQL database on port 3306
- Express backend on port 5000
- Frontend (Nginx) on port 3000

## 📚 API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie

### Bookings
- `POST /api/book` - Create booking
- `GET /api/bookings` - Get all bookings

### Authentication
- `POST /api/signup` - User registration
- `POST /api/login` - User login

### Admin
- `POST /api/admin/movies` - Add new movie

## 🎯 Features Breakdown

### Home Page
- Hero section with call-to-action
- Featured "Now Showing" movies
- Feature highlights section

### Movies Page
- Search functionality
- Movie grid display
- Filter by rating/year (coming soon)

### Booking Page
- Interactive seat grid (A1-H10)
- Theatre selection
- Show time selection
- Real-time price calculation
- Booking summary sidebar

### Authentication
- User signup form
- User login form
- Session management

### Bookings History
- View all bookings
- Booking details
- Download ticket (coming soon)

## 🔐 Security Features
- CORS configuration
- Input validation
- Error handling
- Prepared SQL statements (MySQL2)

## 🚧 Future Enhancements

- [ ] JWT-based authentication
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] QR code ticket generation
- [ ] Real-time seat locking with Socket.IO
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Gift card system
- [ ] TMDb API integration
- [ ] User ratings and reviews
- [ ] CI/CD pipeline

## 📝 Testing

The application has been tested for:
- ✅ Responsive design across devices
- ✅ Movie listing and filtering
- ✅ Seat selection and booking
- ✅ API endpoint functionality
- ✅ Database connectivity

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kishore** - [GitHub](https://github.com/kishore-9000)

## 📞 Support

For support, please open an issue on GitHub.

---

**Last Updated**: May 2026
**Version**: 1.0.0
