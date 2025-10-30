import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';
import { MapPin, Bed, Bath, Square, MessageCircle, ArrowLeft, Check } from 'lucide-react';
import GoogleMap from '../components/GoogleMap';
import { toast } from 'react-toastify';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById } = useProperty();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    try {
      const data = await getPropertyById(id);
      setProperty(data);
    } catch (error) {
      toast.error('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const handleContactOwner = () => {
    if (!user) {
      toast.info('Please login to contact the owner');
      navigate('/login');
      return;
    }
    navigate(`/chat/${property._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-500">Property not found</p>
      </div>
    );
  }

  const defaultImage = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
  const images = property.images?.length > 0 ? property.images : [defaultImage];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="relative h-96">
                <img
                  src={images[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${property.title} ${index + 1}`}
                      onClick={() => setCurrentImage(index)}
                      className={`h-20 w-20 object-cover rounded cursor-pointer ${
                        currentImage === index ? 'ring-2 ring-primary-600' : ''
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.state}
                    </span>
                  </div>
                  <div className="inline-block">
                    {property.listingType === 'sale' && (
                      <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        For Sale
                      </span>
                    )}
                    {property.listingType === 'rent' && (
                      <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        For Rent
                      </span>
                    )}
                    {property.listingType === 'both' && (
                      <span className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Rent or Sale
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {property.listingType === 'sale' ? (
                    <>
                      <p className="text-3xl font-bold text-green-600">
                        ${(property.salePrice || property.price).toLocaleString()}
                      </p>
                      <p className="text-gray-600">sale price</p>
                    </>
                  ) : property.listingType === 'both' ? (
                    <>
                      <p className="text-2xl font-bold text-primary-600">
                        ${property.price.toLocaleString()}/mo
                      </p>
                      <p className="text-xl font-bold text-green-600 mt-1">
                        ${property.salePrice.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">rent or buy</p>
                    </>
                  ) : (
                    <>
                      <p className="text-3xl font-bold text-primary-600">
                        ${property.price.toLocaleString()}
                      </p>
                      <p className="text-gray-600">per month</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 py-4 border-t border-b">
                <div className="text-center">
                  <Bed className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-semibold">{property.bedrooms}</p>
                </div>
                <div className="text-center">
                  <Bath className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-semibold">{property.bathrooms}</p>
                </div>
                <div className="text-center">
                  <Square className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-semibold">{property.size} sqft</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Type</p>
                  <p className="font-semibold capitalize">{property.propertyType}</p>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>

              {property.amenities && property.amenities.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <GoogleMap coordinates={property.location.coordinates} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Contact Owner</h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold text-lg">
                      {property.owner?.name?.charAt(0) || 'O'}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{property.owner?.name || 'Owner'}</p>
                    <p className="text-sm text-gray-600">Property Owner</p>
                  </div>
                </div>
                
                {property.owner?.email && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Email:</strong> {property.owner.email}
                  </p>
                )}
                {property.owner?.phone && (
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {property.owner.phone}
                  </p>
                )}
              </div>

              <button
                onClick={handleContactOwner}
                className={`w-full ${property.listingType === 'sale' ? 'bg-green-600 hover:bg-green-700' : property.listingType === 'both' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-primary-600 hover:bg-primary-700'} text-white py-3 rounded-lg transition flex items-center justify-center gap-2 font-semibold`}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Send Message</span>
              </button>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Property ID:</strong> #{property._id.slice(-8)}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Listed:</strong> {new Date(property.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Status:</strong>{' '}
                  <span className={property.available ? 'text-green-600' : 'text-red-600'}>
                    {property.available ? 'Available' : 'Not Available'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
