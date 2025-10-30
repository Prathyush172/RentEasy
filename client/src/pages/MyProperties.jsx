import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building2, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProperties = () => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get('/api/properties/user/my-properties', config);
      setProperties(data);
    } catch (error) {
      toast.error('Failed to load your properties');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      await axios.delete(`/api/properties/${id}`, config);
      toast.success('Property deleted successfully');
      loadMyProperties();
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
          </div>
          <Link
            to="/add-property"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add Property</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={property.images?.[0] || defaultImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full font-semibold">
                    ${property.price.toLocaleString()}/mo
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 truncate">
                    {property.location.address}, {property.location.city}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.size} sqft</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/properties/${property._id}`}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition text-center text-sm"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded ${
                        property.available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {property.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Properties Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by adding your first property listing
            </p>
            <Link
              to="/add-property"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              Add Your First Property
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
