import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, MessageCircle, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-28 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-100">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-50 max-w-3xl mx-auto">
              Discover amazing rental properties with interactive maps, smart filters, and instant messaging - completely free!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/properties"
                className="group inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <Search className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Browse Properties
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center bg-primary-500 bg-opacity-20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-opacity-30 hover:scale-105 transition-all duration-300"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slideUp">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Why Choose RentEasy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to find or list properties - all for free!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scaleIn">
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <MapPin className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Interactive Maps
              </h3>
              <p className="text-gray-600 leading-relaxed">
                View exact locations with FREE OpenStreetMap integration. No API keys, no limits!
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scaleIn" style={{animationDelay: '0.1s'}}>
              <div className="bg-gradient-to-br from-green-500 to-green-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <Search className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Smart Filters
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Filter by budget, size, location, bedrooms, and amenities to find exactly what you need.
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scaleIn" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">
                Real-Time Chat
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect instantly with property owners through our built-in messaging system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Shield className="h-16 w-16 text-white mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Ready to Find Your Next Home?
          </h2>
          <p className="text-xl md:text-2xl text-primary-50 mb-10 max-w-3xl mx-auto">
            Join thousands of happy renters and property owners. 100% free, no hidden costs!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="group bg-white text-primary-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center justify-center"
            >
              Get Started Free
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/properties"
              className="bg-primary-500 bg-opacity-20 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
