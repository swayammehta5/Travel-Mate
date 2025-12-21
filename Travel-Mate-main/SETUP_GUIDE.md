# Travel Mate - Setup Guide

This guide will help you set up and run the Travel Mate application on localhost.

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (running locally on port 27017 or MongoDB Atlas connection string)
3. **npm** or **yarn**

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
A `.env` file has been created with the following configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### 4. Start MongoDB
Make sure MongoDB is running:
```bash
# Windows (if MongoDB is installed as a service)
# MongoDB should start automatically

# Or start manually
mongod
```

### 5. Start the backend server
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on **http://localhost:5000**

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
A `.env` file has been created with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start the frontend server
```bash
npm start
```

The frontend will run on **http://localhost:3000** (default React port)

## Running Both Servers

### Option 1: Two Terminal Windows
1. **Terminal 1** - Backend:
   ```bash
   cd backend
   npm run dev
   ```

2. **Terminal 2** - Frontend:
   ```bash
   cd frontend
   npm start
   ```

### Option 2: Using npm-run-all (if installed)
```bash
# From root directory
npm install -g npm-run-all
npm-run-all --parallel backend:dev frontend:start
```

## Testing the Connection

1. **Backend Health Check:**
   - Open browser: http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"Server is running"}`

2. **Frontend:**
   - Open browser: http://localhost:3000
   - You should see the Travel Mate login page

3. **Test Authentication:**
   - Register a new user
   - Login with credentials
   - Create a trip
   - Test other features

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file
- For MongoDB Atlas, update `MONGODB_URI` with your connection string

**Port 5000 Already in Use:**
- Change `PORT` in backend `.env` file
- Update `REACT_APP_API_URL` in frontend `.env` accordingly

**CORS Errors:**
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Check browser console for specific CORS error messages

### Frontend Issues

**API Connection Failed:**
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure `.env` file is in `frontend` directory (not `frontend/src`)
- Restart frontend server after changing `.env` file

**Socket.io Connection Failed:**
- Verify backend is running
- Check browser console for socket errors
- Ensure JWT token is stored in localStorage after login

**Module Not Found Errors:**
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## Environment Variables Reference

### Backend (.env)
- `PORT` - Backend server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT token expiration (default: 7d)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API base URL (default: http://localhost:5000/api)

**Note:** Frontend environment variables must start with `REACT_APP_` to be accessible in React.

## API Endpoints

All API endpoints are prefixed with `/api`:

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`
- **Trips:** `/api/trips`, `/api/trips/:id`
- **Expenses:** `/api/expenses/:tripId`
- **Itinerary:** `/api/itinerary/:tripId`
- **Tasks:** `/api/tasks/:tripId`
- **Gallery:** `/api/gallery/:tripId`
- **Chat:** `/api/chat/:tripId`
- **Notifications:** `/api/notifications`
- **Invitations:** `/api/invitations`

## Features to Test

1. ✅ User Registration & Login
2. ✅ Create/View/Edit/Delete Trips
3. ✅ Add Expenses & View Charts
4. ✅ Create Itinerary Items
5. ✅ Manage Tasks & Checklists
6. ✅ Upload Photos/Videos to Gallery
7. ✅ Real-time Chat (Socket.io)
8. ✅ Notifications & Invitations

## Production Deployment

Before deploying to production:

1. Change `JWT_SECRET` to a secure random string
2. Set `NODE_ENV=production`
3. Update `FRONTEND_URL` to your production frontend URL
4. Use MongoDB Atlas or secure MongoDB instance
5. Configure HTTPS for both frontend and backend
6. Update CORS origins to production URLs only

---

**Happy Traveling! ✈️**

