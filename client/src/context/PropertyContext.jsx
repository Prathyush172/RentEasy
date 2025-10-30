import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    propertyType: '',
    listingType: '',
    bedrooms: '',
    bathrooms: ''
  });

  const fetchProperties = async (queryParams = {}) => {
    try {
      const params = new URLSearchParams(queryParams).toString();
      const { data } = await axios.get(`/api/properties?${params}`);
      setProperties(data);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch properties';
    }
  };

  const getPropertyById = async (id) => {
    try {
      const { data } = await axios.get(`/api/properties/${id}`);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch property';
    }
  };

  const createProperty = async (propertyData, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.post('/api/properties', propertyData, config);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create property';
    }
  };

  const updateProperty = async (id, propertyData, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.put(`/api/properties/${id}`, propertyData, config);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update property';
    }
  };

  const deleteProperty = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      await axios.delete(`/api/properties/${id}`, config);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to delete property';
    }
  };

  const value = {
    properties,
    filters,
    setFilters,
    fetchProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
  };

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
};
