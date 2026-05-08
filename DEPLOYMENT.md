# Deployment Guide - Movie Ticket Booking System

## Quick Start Locally

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kishore-9000/Movie-Ticket-Booking-System.git
   cd Movie-Ticket-Booking-System
   ```

2. **Setup Database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. **Setup Backend**
   ```bash
   cd server
   cp .env.example .env
   npm install
   npm start
   ```

4. **Setup Frontend** (new terminal)
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm start
   ```

Visit `http://localhost:3000`

---

## Production Deployment

### Option 1: Railway (Recommended)

1. **Push to GitHub** (if not done)
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Deploy Backend on Railway**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Set environment variables:
     - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Deploy

3. **Deploy Frontend on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Set `REACT_APP_API_URL` to your Railway backend URL
   - Deploy

### Option 2: Docker with AWS/DigitalOcean

1. **Build Docker image**
   ```bash
   docker build -t movie-booking:latest .
   ```

2. **Push to Docker Hub**
   ```bash
   docker tag movie-booking:latest yourusername/movie-booking:latest
   docker push yourusername/movie-booking:latest
   ```

3. **Deploy on DigitalOcean/AWS**
   - Use Docker Compose or Kubernetes
   - Pull the image and run containers

### Option 3: Docker Compose Locally

```bash
docker-compose up -d
```

Access at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Database: `localhost:3306`

---

## Environment Variables

Create `.env` files in `server/` and `client/`:

**server/.env:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=movie_booking
NODE_ENV=production
```

**client/.env:**
```
REACT_APP_API_URL=https://your-backend-url.com
```

---

## Next Steps

1. Configure free MySQL hosting (PlanetScale, Supabase)
2. Set up CI/CD with GitHub Actions
3. Add SSL certificates
4. Enable monitoring and logging
