const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');

// @route   GET /api/chats
// @desc    Get all chats for current user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    })
      .populate('property', 'title images price location')
      .populate('participants', 'name avatar')
      .sort({ lastMessage: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/chats/:propertyId
// @desc    Get or create chat for a property
// @access  Private
router.get('/:propertyId', protect, async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Find existing chat
    let chat = await Chat.findOne({
      property: propertyId,
      participants: req.user._id
    })
      .populate('property', 'title images price location owner')
      .populate('participants', 'name avatar email');

    if (!chat) {
      // Get property to find owner
      const Property = require('../models/Property');
      const property = await Property.findById(propertyId);

      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }

      // Create new chat
      chat = await Chat.create({
        property: propertyId,
        participants: [req.user._id, property.owner],
        messages: []
      });

      chat = await chat.populate('property', 'title images price location owner');
      chat = await chat.populate('participants', 'name avatar email');
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/chats/:chatId/messages
// @desc    Send a message
// @access  Private
router.post('/:chatId/messages', protect, async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if user is a participant
    if (!chat.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const message = {
      sender: req.user._id,
      content,
      timestamp: new Date()
    };

    chat.messages.push(message);
    chat.lastMessage = new Date();
    await chat.save();

    // Populate the new message sender info
    const updatedChat = await Chat.findById(chatId)
      .populate('participants', 'name avatar')
      .populate('messages.sender', 'name avatar');

    res.json(updatedChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/chats/:chatId/read
// @desc    Mark messages as read
// @access  Private
router.put('/:chatId/read', protect, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Mark all messages not sent by current user as read
    chat.messages.forEach(msg => {
      if (msg.sender.toString() !== req.user._id.toString()) {
        msg.read = true;
      }
    });

    await chat.save();
    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
