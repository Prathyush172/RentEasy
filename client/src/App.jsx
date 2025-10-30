import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import AddProperty from './pages/AddProperty';
import MyProperties from './pages/MyProperties';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route 
          path="/add-property" 
          element={
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/my-properties" 
          element={
            <PrivateRoute>
              <MyProperties />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/chat/:propertyId" 
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          } 
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
