# 🚀 RentEasy Setup Guide

This guide will walk you through setting up the RentEasy application step by step.

## 📌 Quick Start

Follow these steps to get the application running on your local machine:

### Step 1: Install Dependencies

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

### Step 2: Configure Environment Variables

**Backend** - Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/renteasy
JWT_SECRET=mySecretKey123456789
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Frontend** - Create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   mongod
   ```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in server/.env:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/renteasy
   ```

### Step 4: Get Google Maps API Key

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create an API Key
5. Add the key to `client/.env`

**Important:** For development, you can use the maps without restrictions, but for production, add HTTP referrer restrictions.

### Step 5: Run the Application

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
You should see: `Server running in development mode on port 5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
You should see: `Local: http://localhost:3000`

### Step 6: Access the Application

Open your browser and navigate to: **http://localhost:3000**

## 🎯 First Steps After Setup

### 1. Create an Account
- Click "Sign Up"
- Choose your role (Renter, Owner, or Both)
- Fill in your details

### 2. Add a Property (For Owners)
- Login as an owner
- Click "Add Property"
- Fill in property details
- Add coordinates for Google Maps (or it will use default NYC coordinates)

### 3. Browse Properties
- Visit "Browse Properties"
- Use filters to search
- Click on a property to view details

### 4. Test Chat
- View a property
- Click "Send Message"
- Start chatting with the owner

## 🔧 Troubleshooting

### MongoDB Connection Error
**Problem:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running: `mongod`
- Check your connection string in `.env`
- For Atlas, ensure your IP is whitelisted

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change the PORT in server/.env to another port (e.g., 5001)
- Or kill the process using the port:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Mac/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Google Maps Not Showing
**Problem:** Map shows gray box or error

**Solution:**
- Verify API key is correct in `client/.env`
- Ensure Maps JavaScript API is enabled
- Check browser console for specific errors
- Add http://localhost:3000 to authorized domains

### CORS Error
**Problem:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution:**
- Make sure backend is running
- Verify `CLIENT_URL` in server/.env matches your frontend URL
- Clear browser cache

### Socket.io Connection Failed
**Problem:** Chat not working in real-time

**Solution:**
- Ensure backend is running on port 5000
- Check that Socket.io is connecting to the correct URL
- Look for Socket.io connection logs in browser console

## 📊 Sample Data

You can create sample properties using the "Add Property" form. Here's some example data:

**Property 1:**
- Title: Modern 2BR Apartment Downtown
- Type: Apartment
- Price: 2500
- Bedrooms: 2
- Bathrooms: 2
- Size: 1200
- Address: 123 Main St
- City: New York
- State: NY
- ZIP: 10001
- Lat: 40.7128
- Lng: -74.0060

**Property 2:**
- Title: Spacious 3BR House with Garden
- Type: House
- Price: 3500
- Bedrooms: 3
- Bathrooms: 2.5
- Size: 2000
- Address: 456 Oak Avenue
- City: Brooklyn
- State: NY
- ZIP: 11201
- Lat: 40.6782
- Lng: -73.9442

## 🔐 Default Test Accounts

Create these accounts for testing:

**Owner Account:**
- Email: owner@test.com
- Password: password123
- Role: Owner

**Renter Account:**
- Email: renter@test.com
- Password: password123
- Role: Renter

## 📱 Features to Test

1. ✅ User Registration & Login
2. ✅ Browse Properties with Filters
3. ✅ View Property Details with Google Maps
4. ✅ Add New Property (Owner)
5. ✅ Edit/Delete Property (Owner)
6. ✅ Real-time Chat
7. ✅ Search by Location
8. ✅ Responsive Design (Mobile/Tablet/Desktop)

## 🛠️ Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Nodemon restarts server on file changes

### Debugging
- Backend: Add `console.log()` statements, they'll appear in the backend terminal
- Frontend: Use browser DevTools (F12) → Console tab
- Network: Check the Network tab in DevTools for API calls

### Database GUI
Use MongoDB Compass to view your database:
1. Download from https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Browse the `renteasy` database

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Maps API](https://developers.google.com/maps/documentation)
- [Socket.io Docs](https://socket.io/docs/)

## ❓ Need Help?

If you encounter any issues:
1. Check the console/terminal for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Make sure MongoDB is running
5. Check that both frontend and backend servers are running

---

**Happy Coding! 🎉**
