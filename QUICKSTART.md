# 🚀 Quick Start Guide

## Option 1: Docker (Easiest)

### Prerequisites
- Docker
- Docker Compose

### Run
```bash
docker-compose up -d
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Database: localhost:3306

**Default DB Credentials:**
- User: root
- Password: root

---

## Option 2: Local Development

### Prerequisites
- Node.js 18+
- MySQL 8.0+

### Step 1: Setup Database
```bash
mysql -u root -p
CREATE DATABASE movie_booking;
USE movie_booking;
source database/schema.sql;
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 3: Create Environment Files

**server/.env:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=movie_booking
NODE_ENV=development
```

**client/.env:**
```
REACT_APP_API_URL=http://localhost:5000
```

### Step 4: Start Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Frontend opens at http://localhost:3000
```

---

## Default Test Credentials

**Signup/Login:**
- Email: test@example.com
- Password: password123

---

## 🎬 Features to Test

1. **Homepage** - View featured movies
2. **Search Movies** - Find specific movies
3. **Book Tickets** - Select seats interactively
4. **View Bookings** - See booking history
5. **Authentication** - Sign up and login

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port
kill -9 $(lsof -ti:3000)  # Frontend
kill -9 $(lsof -ti:5000)  # Backend
```

### Database Connection Error
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database `movie_booking` exists

### CORS Error
- Backend must be running on :5000
- Frontend .env must have correct `REACT_APP_API_URL`

### Dependencies Not Installing
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all movies |
| POST | `/api/book` | Create booking |
| GET | `/api/bookings` | Get bookings |
| POST | `/api/signup` | Register user |
| POST | `/api/login` | Login user |

---

## 🔍 Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── App.js         # Main app with routing
│   ├── styles.css     # Global styles
│   └── index.js       # React entry point
└── public/
    └── index.html     # HTML template

server/
├── index.js           # Express server & API endpoints
└── package.json       # Dependencies

database/
└── schema.sql         # MySQL schema
```

---

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment options:
- Railway
- Vercel + Railway
- AWS/DigitalOcean with Docker
- Heroku

---

## 💡 Next Steps

1. Add payment gateway integration
2. Implement JWT authentication  
3. Add real-time seat locking with Socket.IO
4. Create admin dashboard
5. Integrate TMDb API for movie data
6. Add QR code ticket generation

---

## 📞 Support

For issues, check [GitHub Issues](https://github.com/kishore-9000/Movie-Ticket-Booking-System/issues)

---

**Happy Booking! 🎫**
