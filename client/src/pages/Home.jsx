import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, MessageCircle, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover the best rental properties with RentEasy
            </p>
            <Link
              to="/properties"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose RentEasy?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Location-Based Search
              </h3>
              <p className="text-gray-600">
                Find properties with integrated Google Maps. See exact locations and nearby amenities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Advanced Filters
              </h3>
              <p className="text-gray-600">
                Filter by budget, size, location, and amenities to find exactly what you need.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Direct Communication
              </h3>
              <p className="text-gray-600">
                Chat directly with property owners in real-time to get answers fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of renters and owners on RentEasy
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/properties"
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
