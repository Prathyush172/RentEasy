# 🏠 RentEasy - Smart Property Finder

A full-stack MERN (MongoDB, Express, React, Node.js) real estate listing platform with interactive maps, advanced filters, and real-time chat functionality.

## 💰 100% FREE TO RUN - No API Keys Required!

## ✨ Features

- **Property Listings**: Browse, search, and filter rental properties
- **Interactive Maps**: View property locations on maps with OpenStreetMap (100% FREE!)
- **Advanced Filters**: Filter by budget, location, size, bedrooms, bathrooms, and property type
- **Real-time Chat**: Direct communication between property owners and renters using Socket.io
- **User Authentication**: Secure login and registration with JWT
- **Role-based Access**: Different features for owners and renters
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Property Management**: Owners can add, edit, and delete their listings
- **💰 Zero Cost**: Completely free to run - no API keys needed!

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Socket.io Client
- Leaflet.js + OpenStreetMap (Free Maps!)
- Lucide React (icons)
- React Toastify
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Socket.io
- bcryptjs
- CORS

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- MongoDB (local or Atlas - free tier available)
- npm or yarn

**That's it! No API keys needed - 100% FREE to run! 🎉**

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
cd RentEasy
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/renteasy
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000/api
```

That's all you need! No API keys required! 🎉

### 4. Start MongoDB

Make sure MongoDB is running:
```bash
# If using local MongoDB
mongod

# If using MongoDB Atlas, just use your connection string in MONGODB_URI
```

### 5. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📱 Usage

### For Renters

1. **Register/Login**: Create an account or login as a renter
2. **Browse Properties**: View all available properties
3. **Filter & Search**: Use filters to find properties matching your criteria
4. **View Details**: Click on a property to see full details and location on map
5. **Contact Owner**: Send messages to property owners via real-time chat

### For Property Owners

1. **Register/Login**: Create an account as an owner or both
2. **Add Property**: List your property with details, location, and images
3. **Manage Listings**: View, edit, or delete your properties
4. **Respond to Inquiries**: Chat with potential renters in real-time

## 🗂️ Project Structure

```
RentEasy/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Auth, Property)
│   │   ├── pages/         # Page components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Express backend
│   ├── config/           # Database configuration
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property (Protected, Owner)
- `PUT /api/properties/:id` - Update property (Protected, Owner)
- `DELETE /api/properties/:id` - Delete property (Protected, Owner)
- `GET /api/properties/user/my-properties` - Get user's properties (Protected)

### Chat
- `GET /api/chats` - Get all user chats (Protected)
- `GET /api/chats/:propertyId` - Get or create chat for property (Protected)
- `POST /api/chats/:chatId/messages` - Send message (Protected)
- `PUT /api/chats/:chatId/read` - Mark messages as read (Protected)

## 🎨 Features in Detail

### Interactive Maps with OpenStreetMap
- **100% FREE** - No API keys or costs!
- Interactive maps on property details page
- Marker showing exact property location
- Zoom and pan controls
- Clean and modern map interface
- Powered by Leaflet.js and OpenStreetMap

### Advanced Filtering
- Filter by city/location
- Price range slider
- Size range (square footage)
- Number of bedrooms and bathrooms
- Property type selection
- Combine multiple filters

### Real-time Chat
- Socket.io powered instant messaging
- Chat history persistence
- Unread message indicators
- Multiple conversation support
- Online/offline status

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Modern and clean UI

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS configuration
- Input validation
- Environment variables for sensitive data

## 🚧 Future Enhancements

- [ ] Image upload functionality with cloud storage
- [ ] Email notifications
- [ ] Favorite/Bookmark properties
- [ ] Advanced search with autocomplete
- [ ] Property reviews and ratings
- [ ] Payment integration
- [ ] Virtual tours
- [ ] Admin dashboard
- [ ] Analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ for learning and demonstration purposes.

## 📧 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy House Hunting! 🏡**
