const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { protect } = require('../middleware/auth');

// @route   GET /api/properties
// @desc    Get all properties with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      propertyType,
      bedrooms,
      bathrooms
    } = req.query;

    // Build query
    let query = { available: true };

    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minSize || maxSize) {
      query.size = {};
      if (minSize) query.size.$gte = Number(minSize);
      if (maxSize) query.size.$lte = Number(maxSize);
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (bedrooms) {
      query.bedrooms = Number(bedrooms);
    }

    if (bathrooms) {
      query.bathrooms = Number(bathrooms);
    }

    const properties = await Property.find(query)
      .populate('owner', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/properties/:id
// @desc    Get single property
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone avatar');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/properties
// @desc    Create a new property
// @access  Private (Owner only)
router.post('/', protect, async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      owner: req.user._id
    };

    const property = await Property.create(propertyData);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/properties/:id
// @desc    Update property
// @access  Private (Owner only)
router.put('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is the owner
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/properties/:id
// @desc    Delete property
// @access  Private (Owner only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if user is the owner
    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await property.deleteOne();
    res.json({ message: 'Property removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/properties/user/my-properties
// @desc    Get current user's properties
// @access  Private
router.get('/user/my-properties', protect, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id })
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
