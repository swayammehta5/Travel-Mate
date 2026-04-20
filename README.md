# Travel App - MERN Stack Project

A complete travel-related mobile app that captures and manages trip-related information. Built with React, Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (JWT) - Signup, Login, Logout
- ✅ Trip Management - Create, Read, Update, Delete trips
- ✅ Expense Tracking - Track expenses by category
- ✅ Daily Logs - Record experiences and places visited
- ✅ Geolocation Tracking - Capture location using browser geolocation API
- ✅ Dashboard - View all trips with summary statistics
- ✅ Mobile-Friendly UI - Fully responsive design with TailwindCSS
- ✅ PWA Support - Installable on mobile devices

## Project Structure

```
root-folder/
├── backend/
│   ├── server.jsx
│   ├── config/
│   │     └── db.jsx
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │    ├── components/
    │    ├── pages/
    │    ├── context/
    │    ├── hooks/
    │    ├── config/
    │    ├── App.jsx
    │    └── index.jsx
    └── package.json
```

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React.js
- React Router
- TailwindCSS
- Axios
- PWA Support

## Installation & Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/travelapp
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

4. Start the backend server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Trips
- `POST /api/trips` - Create a new trip (protected)
- `GET /api/trips` - Get all trips for current user (protected)
- `GET /api/trips/:id` - Get trip details (protected)
- `PUT /api/trips/:id` - Update trip (protected)
- `DELETE /api/trips/:id` - Delete trip (protected)

### Expenses
- `POST /api/expenses/:tripId` - Add expense to trip (protected)
- `GET /api/expenses/:tripId` - Get all expenses for a trip (protected)
- `PUT /api/expenses/:tripId/:expenseId` - Update expense (protected)
- `DELETE /api/expenses/:tripId/:expenseId` - Delete expense (protected)

### Logs
- `POST /api/logs/:tripId` - Add daily log to trip (protected)
- `GET /api/logs/:tripId` - Get all logs for a trip (protected)
- `PUT /api/logs/:tripId/:logId` - Update log (protected)
- `DELETE /api/logs/:tripId/:logId` - Delete log (protected)

## Trip Data Model

```javascript
{
  userId: ObjectId,
  tripName: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  travelers: Number,
  purpose: String,
  budget: Number,
  notes: String
}
```

## Expense Data Model

```javascript
{
  tripId: ObjectId,
  category: String, // food, travel, hotel, shopping, entertainment, other
  amount: Number,
  date: Date,
  notes: String
}
```

## Log Data Model

```javascript
{
  tripId: ObjectId,
  date: Date,
  experience: String,
  placesVisited: [String],
  photos: [String],
  location: {
    latitude: Number,
    longitude: Number
  }
}
```

## Features in Detail

### User Authentication
- Secure password hashing with bcryptjs
- JWT token-based authentication
- Protected routes using middleware
- Token stored in localStorage

### Trip Management
- Create trips with all required fields
- View all trips in dashboard
- Edit trip details
- Delete trips (cascades to expenses and logs)
- View trip statistics (total spent, days, places)

### Expense Tracking
- Add expenses by category
- View all expenses for a trip
- Edit and delete expenses
- Automatic total calculation

### Daily Logs
- Record daily experiences
- Track places visited
- Capture geolocation
- View all logs chronologically

### Dashboard
- Overview of all trips
- Quick statistics
- Easy navigation to trip details
- Add new trip button

## PWA Features

The app is configured as a Progressive Web App (PWA):
- Service worker for offline support
- Web app manifest for installation
- Installable on mobile devices
- Responsive design optimized for mobile

## Mobile Optimization

- Fully responsive design
- Touch-friendly interface
- Mobile-first approach
- Optimized for small screens
- Fast loading times

## Future Enhancements

- Google Maps API integration
- Photo upload via Cloudinary
- Dark mode toggle
- Export trip data as PDF
- Share trips with friends
- Push notifications

## License

ISC

## Author

Travel App Development Team


