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
```

**That's it! No API keys needed! 🆓**

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

## 🗺️ Maps - Completely FREE!

This app uses **OpenStreetMap** with **Leaflet.js**:
- ✅ No API keys required
- ✅ No usage limits
- ✅ No costs ever
- ✅ Works out of the box

Just run the app and maps will work automatically! 🎉

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
- Check internet connection (maps load from OpenStreetMap)
- Clear browser cache and reload

For more detailed instructions, see `SETUP_GUIDE.md`

---

**Need Help?** Check the full documentation in README.md
