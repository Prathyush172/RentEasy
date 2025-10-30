import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, MessageCircle, PlusCircle, Building2, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-primary-600" />
              <span className="text-2xl font-bold text-gray-800">RentEasy</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/properties"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Browse Properties
            </Link>

            {user ? (
              <>
                {(user.role === 'owner' || user.role === 'both') && (
                  <>
                    <Link
                      to="/add-property"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      <PlusCircle className="h-4 w-4" />
                      <span>Add Property</span>
                    </Link>
                    <Link
                      to="/my-properties"
                      className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>My Properties</span>
                    </Link>
                  </>
                )}
                <Link
                  to="/chat"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Messages</span>
                </Link>
                <div className="flex items-center space-x-2 text-gray-700 px-3 py-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/properties"
              className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Properties
            </Link>

            {user ? (
              <>
                {(user.role === 'owner' || user.role === 'both') && (
                  <>
                    <Link
                      to="/add-property"
                      className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Add Property
                    </Link>
                    <Link
                      to="/my-properties"
                      className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Properties
                    </Link>
                  </>
                )}
                <Link
                  to="/chat"
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Messages
                </Link>
                <div className="px-3 py-2 text-gray-700 font-medium">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-600 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
