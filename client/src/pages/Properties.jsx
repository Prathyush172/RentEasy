import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { Search, Filter, MapPin, Bed, Bath, Square } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import { toast } from 'react-toastify';

const Properties = () => {
  const { properties, filters, setFilters, fetchProperties } = useProperty();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      await fetchProperties(filters);
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const newFilters = { ...filters, city: searchCity };
    setFilters(newFilters);
    setLoading(true);
    try {
      await fetchProperties(newFilters);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    setLoading(true);
    try {
      await fetchProperties(newFilters);
    } catch (error) {
      toast.error('Filter failed');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = async () => {
    const emptyFilters = {
      city: '',
      minPrice: '',
      maxPrice: '',
      minSize: '',
      maxSize: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: ''
    };
    setFilters(emptyFilters);
    setSearchCity('');
    setLoading(true);
    try {
      await fetchProperties(emptyFilters);
    } catch (error) {
      toast.error('Failed to clear filters');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter city or location..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition flex items-center justify-center gap-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </form>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        )}

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {loading ? 'Loading...' : `${properties.length} Properties Found`}
          </h2>
        </div>

        {/* Property Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No properties found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
