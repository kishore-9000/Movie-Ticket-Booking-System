#!/bin/bash

# Setup Script for Movie Ticket Booking System

echo "🎬 Setting up Movie Ticket Booking System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
  echo "❌ Node.js is not installed. Please install Node.js 18+"
  exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null
then
  echo "⚠️  MySQL is not installed. Install it or use docker-compose instead."
fi

echo "✅ Prerequisites check passed"

# Setup Database
echo "📦 Setting up database..."
if command -v mysql &> /dev/null
then
  read -p "Enter MySQL root password: " -s mysql_password
  mysql -u root -p"$mysql_password" < database/schema.sql
  echo "✅ Database setup complete"
fi

# Setup Backend
echo "🔧 Installing backend dependencies..."
cd server
npm install
cd ..
echo "✅ Backend setup complete"

# Setup Frontend
echo "🎨 Installing frontend dependencies..."
cd client
npm install
cd ..
echo "✅ Frontend setup complete"

# Create .env file
echo "⚙️  Creating environment files..."

# Backend .env
cat > server/.env << EOF
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=movie_booking
NODE_ENV=development
EOF

# Frontend .env
cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5000
EOF

echo "✅ Environment files created"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "  Terminal 1: cd server && npm start (Backend on port 5000)"
echo "  Terminal 2: cd client && npm start (Frontend on port 3000)"
echo ""
echo "Or use Docker:"
echo "  docker-compose up -d"
echo ""
