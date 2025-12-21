# Connection Setup Summary

This document summarizes all changes made to connect the React frontend with the Node/Express backend.

## ✅ Changes Made

### 1. Environment Configuration Files Created

#### Backend `.env` (Travel-Mate-main/backend/.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel-app
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend `.env` (Travel-Mate-main/frontend/.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 2. Backend Server Configuration Updates

#### File: `backend/server.js`

**CORS Configuration Enhanced:**
- Updated CORS to support multiple origins (localhost:3000 and localhost:5173 for Vite)
- Added development mode check to allow all origins in development
- Maintains credentials support for cookies and authentication

**Changes:**
```javascript
// Before:
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// After:
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5173' // Vite default port
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### 3. Socket.io Configuration Updates

#### File: `backend/src/socket/socketServer.js`

**CORS Configuration Updated:**
- Updated Socket.io CORS to match Express CORS settings
- Supports multiple origins in development mode

**Changes:**
```javascript
// Before:
io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }
});

// After:
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:5173'
].filter(Boolean);

io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'development' ? allowedOrigins : (process.env.FRONTEND_URL || 'http://localhost:3000'),
    credentials: true
  }
});
```

### 4. Frontend API Client Configuration

#### File: `frontend/src/api/client.jsx`

**Already Configured Correctly:**
- Uses `REACT_APP_API_URL` environment variable
- Defaults to `http://localhost:5000/api` if env var not set
- Includes JWT token in Authorization header
- Supports credentials (cookies)
- Handles 401 errors (unauthorized) by redirecting to login

**Current Configuration:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
```

### 5. Socket.io Client Configuration

#### File: `frontend/src/components/Chat.jsx`

**Already Configured Correctly:**
- Uses `REACT_APP_API_URL` environment variable
- Strips `/api` suffix for Socket.io connection
- Defaults to `http://localhost:5000` if env var not set
- Includes JWT token in auth object

**Current Configuration:**
```javascript
const newSocket = io(process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000', {
  auth: { token },
  transports: ['websocket', 'polling']
});
```

## 🔧 Configuration Details

### Backend Port
- **Default:** 5000
- **Configurable via:** `PORT` environment variable in `backend/.env`

### Frontend Port
- **Default:** 3000 (Create React App default)
- **Alternative:** 5173 (Vite default, also supported)

### API Base URL
- **Backend:** `http://localhost:5000`
- **API Endpoints:** `http://localhost:5000/api`
- **Socket.io:** `http://localhost:5000`

### Authentication
- **Method:** JWT tokens
- **Storage:** 
  - HTTP-only cookies (backend sets)
  - localStorage (frontend stores for Authorization header)
- **Header Format:** `Authorization: Bearer <token>`

## 📋 Verification Checklist

- ✅ Backend `.env` file created with all required variables
- ✅ Frontend `.env` file created with `REACT_APP_API_URL`
- ✅ CORS configured to allow frontend origin
- ✅ Socket.io CORS configured to match Express CORS
- ✅ API client uses environment variable for base URL
- ✅ Socket.io client uses environment variable for connection
- ✅ `.gitignore` files exclude `.env` files
- ✅ Error handling middleware configured
- ✅ Authentication middleware supports both cookies and Bearer tokens

## 🚀 Next Steps

1. **Install Dependencies:**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

2. **Start MongoDB:**
   - Ensure MongoDB is running on `localhost:27017`
   - Or update `MONGODB_URI` in `backend/.env` with your MongoDB connection string

3. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   - Server should start on `http://localhost:5000`
   - Test: `http://localhost:5000/api/health`

4. **Start Frontend:**
   ```bash
   cd frontend
   npm start
   ```
   - App should start on `http://localhost:3000`
   - Browser should open automatically

5. **Test Connection:**
   - Register a new user
   - Login with credentials
   - Create a trip
   - Test other features

## 🔍 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists in `backend/` directory
- Check port 5000 is not already in use

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in `frontend/.env`
- Restart frontend server after changing `.env`
- Check browser console for CORS errors

### Socket.io connection fails
- Verify backend is running
- Check JWT token is stored in localStorage
- Check browser console for socket errors
- Verify Socket.io CORS configuration

### Authentication issues
- Check JWT_SECRET matches between backend and any token verification
- Verify token is being sent in Authorization header
- Check browser localStorage for stored token
- Verify cookies are enabled in browser

## 📝 Notes

- All environment variables are stored in `.env` files (not committed to git)
- Frontend environment variables must start with `REACT_APP_` prefix
- Backend uses HTTP-only cookies for additional security
- CORS is configured to allow credentials (cookies, authorization headers)
- Socket.io uses the same authentication token as REST API

---

**Setup Complete!** The frontend and backend are now configured to work together on localhost.

