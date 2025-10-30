# ⚡ Quick Start Guide - RentEasy

Get up and running in 5 minutes!

## 1️⃣ Install Dependencies

```bash
# Install root dependencies
npm install

# Or install all at once (recommended)
npm run install-all
```

## 2️⃣ Setup Environment Files

**Backend** - Copy and rename:
```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add your values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/renteasy
JWT_SECRET=your_secret_key_change_this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Frontend** - Copy and rename:
```bash
cd client
cp .env.example .env
```

Edit `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 3️⃣ Start MongoDB

**Option A - Local:**
```bash
mongod
```

**Option B - MongoDB Atlas:**
- Use your Atlas connection string in `MONGODB_URI`

## 4️⃣ Run the Application

**Option A - Run both servers at once (recommended):**
```bash
npm run dev
```

**Option B - Run separately:**

Terminal 1:
```bash
cd server
npm run dev
```

Terminal 2:
```bash
cd client
npm run dev
```

## 5️⃣ Open Your Browser

Navigate to: **http://localhost:3000**

## 🎉 You're Ready!

- **Register** a new account
- **Browse** properties
- **Add** your own property (if owner)
- **Chat** with other users

## 🗺️ Google Maps Setup (Optional but Recommended)

1. Go to: https://console.cloud.google.com/
2. Create a project
3. Enable "Maps JavaScript API"
4. Create API Key
5. Add key to `client/.env`

Without Google Maps key, the app will still work but maps won't display.

## 📌 Default Ports

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🆘 Common Issues

**MongoDB not connecting?**
- Make sure MongoDB is running
- Check your connection string

**Port already in use?**
- Change PORT in server/.env
- Or kill the process using that port

**Can't see maps?**
- Add your Google Maps API key
- Enable Maps JavaScript API in Google Cloud Console

For more detailed instructions, see `SETUP_GUIDE.md`

---

**Need Help?** Check the full documentation in README.md
