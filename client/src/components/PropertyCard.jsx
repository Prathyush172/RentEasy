import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500';
  
  return (
    <Link to={`/properties/${property._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden">
          <img
            src={property.images?.[0] || defaultImage}
            alt={property.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full font-semibold">
            ${property.price.toLocaleString()}/mo
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
            {property.title}
          </h3>

          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm truncate">
              {property.location.address}, {property.location.city}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-600 border-t pt-3">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.size} sqft</span>
            </div>
          </div>

          <div className="mt-3">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded capitalize">
              {property.propertyType}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
