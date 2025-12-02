# SkyDive Platform - Startup Guide

## Prerequisites
- Node.js installed
- MongoDB running (local or cloud)
- Environment variables configured in `backend/.env`

## Quick Start

### 1. Start Backend Server
```bash
cd backend
npm install
npm run dev
```
The backend will run on `http://localhost:4000`

### 2. Start Frontend User App
```bash
cd frontend-user
npm install
npm run dev
```
The user app will run on `http://localhost:5173`

### 3. Start Frontend Admin App
```bash
cd frontend-admin
npm install
npm run dev
```
The admin app will run on `http://localhost:5174`

## Default Credentials

### Admin Login
- Email: `admin@skydive.com`
- Password: `admin`

### Instructor Login
- Email: `instructor@skydive.com`
- Password: `instructor`

### User Registration
Create a new account via the Signup page on the user app.

## Troubleshooting

### ECONNREFUSED Error
- Ensure the backend server is running on port 4000
- Check that MongoDB is connected
- Verify `.env` file exists in backend directory

### Blank Pages
- Clear browser cache
- Check browser console for errors
- Ensure all dependencies are installed

## API Endpoints

### User Routes (`/api/user`)
- POST `/register` - Register new user
- POST `/login` - User login
- GET `/get-profile` - Get user profile (auth required)
- POST `/update-profile` - Update profile (auth required)
- POST `/booking` - Book appointment (auth required)
- GET `/listBookings` - List user bookings (auth required)
- POST `/cancel-appointment` - Cancel booking (auth required)

### Admin Routes (`/api/admin`)
- POST `/login` - Admin login
- POST `/add-instructor` - Add instructor (auth required)
- GET `/bookings` - Get all bookings (auth required)
- POST `/cancel-booking` - Cancel booking (auth required)
- GET `/all-instructors` - Get all instructors (auth required)
- GET `/dashboard` - Get dashboard data (auth required)

### Instructor Routes (`/api/doctor`)
- POST `/login` - Instructor login
- GET `/appointments` - Get instructor appointments (auth required)
- POST `/complete-appointment` - Mark appointment complete (auth required)
- POST `/cancel-appointment` - Cancel appointment (auth required)
- GET `/dashboard` - Get instructor dashboard (auth required)
- GET `/profile` - Get instructor profile (auth required)
- POST `/update-profile` - Update profile (auth required)
