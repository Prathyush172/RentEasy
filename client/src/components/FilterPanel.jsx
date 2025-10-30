import React, { useState } from 'react';
import { X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value
    });
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleClear = () => {
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
    setLocalFilters(emptyFilters);
    onClearFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minPrice"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Size Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size (sqft)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="minSize"
              placeholder="Min"
              value={localFilters.minSize}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="number"
              name="maxSize"
              placeholder="Max"
              value={localFilters.maxSize}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Type
          </label>
          <select
            name="propertyType"
            value={localFilters.propertyType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
            <option value="room">Room</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms
          </label>
          <select
            name="bedrooms"
            value={localFilters.bedrooms}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="0">Studio</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms
          </label>
          <select
            name="bathrooms"
            value={localFilters.bathrooms}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleApply}
          className="flex-1 bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
