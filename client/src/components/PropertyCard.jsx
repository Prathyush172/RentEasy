import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500';
  
  // Display price based on listing type
  const getPriceDisplay = () => {
    if (property.listingType === 'sale') {
      return `$${(property.salePrice || property.price).toLocaleString()}`;
    } else if (property.listingType === 'both') {
      return `$${property.price.toLocaleString()}/mo`;
    }
    return `$${property.price.toLocaleString()}/mo`;
  };

  const getListingBadge = () => {
    if (property.listingType === 'sale') {
      return { text: 'For Sale', color: 'from-green-600 to-green-700' };
    } else if (property.listingType === 'both') {
      return { text: 'Rent/Sale', color: 'from-purple-600 to-purple-700' };
    }
    return { text: 'For Rent', color: 'from-primary-600 to-primary-700' };
  };

  const badge = getListingBadge();
  
  return (
    <Link to={`/properties/${property._id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img
            src={property.images?.[0] || defaultImage}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className={`absolute top-4 right-4 bg-gradient-to-r ${badge.color} text-white px-4 py-2 rounded-full font-bold shadow-lg z-20 backdrop-blur-sm bg-opacity-95`}>
            {getPriceDisplay()}
          </div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-bold z-20">
            {badge.text}
          </div>
          <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/90 backdrop-blur-sm text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
              View Details →
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 mb-3 truncate group-hover:text-primary-600 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
            <span className="text-sm truncate">
              {property.location.address}, {property.location.city}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-700 border-t border-gray-100 pt-4 mb-4">
            <div className="flex items-center space-x-1">
              <div className="bg-primary-50 p-2 rounded-lg">
                <Bed className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Beds</p>
                <p className="text-sm font-bold">{property.bedrooms}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-green-50 p-2 rounded-lg">
                <Bath className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Baths</p>
                <p className="text-sm font-bold">{property.bathrooms}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-purple-50 p-2 rounded-lg">
                <Square className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Size</p>
                <p className="text-sm font-bold">{property.size}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-block bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 text-xs font-semibold px-3 py-1.5 rounded-lg capitalize">
              {property.propertyType}
            </span>
            <span className="text-xs text-gray-500 group-hover:text-primary-600 transition-colors font-medium">
              Click to view
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
