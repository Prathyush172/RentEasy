import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Send, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client';

const Chat = () => {
  const { propertyId } = useParams();
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    loadChats();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (propertyId) {
      loadChatByProperty(propertyId);
    }
  }, [propertyId]);

  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit('join_chat', selectedChat._id);

      socket.on('receive_message', (newMessage) => {
        setSelectedChat(prev => ({
          ...prev,
          messages: [...prev.messages, newMessage]
        }));
      });
    }

    return () => {
      if (socket) {
        socket.off('receive_message');
      }
    };
  }, [socket, selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChats = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get('/api/chats', config);
      setChats(data);
    } catch (error) {
      toast.error('Failed to load chats');
    } finally {
      setLoading(false);
    }
  };

  const loadChatByProperty = async (propId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.get(`/api/chats/${propId}`, config);
      setSelectedChat(data);
      
      // Add to chats list if not already there
      setChats(prev => {
        const exists = prev.find(c => c._id === data._id);
        if (!exists) {
          return [data, ...prev];
        }
        return prev;
      });
    } catch (error) {
      toast.error('Failed to load chat');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.post(
        `/api/chats/${selectedChat._id}/messages`,
        { content: message },
        config
      );

      const newMessage = data.messages[data.messages.length - 1];
      
      // Emit to socket
      if (socket) {
        socket.emit('send_message', {
          chatId: selectedChat._id,
          message: newMessage
        });
      }

      setSelectedChat(data);
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const getOtherParticipant = (chat) => {
    return chat.participants?.find(p => p._id !== user._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Messages</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Chat List */}
            <div className="border-r border-gray-200 overflow-y-auto">
              {chats.length > 0 ? (
                chats.map((chat) => {
                  const otherUser = getOtherParticipant(chat);
                  return (
                    <div
                      key={chat._id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                        selectedChat?._id === chat._id ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-600 font-semibold">
                            {otherUser?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {otherUser?.name || 'User'}
                          </p>
                          <p className="text-sm text-gray-600 truncate">
                            {chat.property?.title || 'Property'}
                          </p>
                        </div>
                      </div>
                      {chat.messages?.length > 0 && (
                        <p className="text-sm text-gray-500 truncate">
                          {chat.messages[chat.messages.length - 1].content}
                        </p>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No conversations yet</p>
                </div>
              )}
            </div>

            {/* Chat Messages */}
            <div className="md:col-span-2 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-white">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary-600 font-semibold">
                          {getOtherParticipant(selectedChat)?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {getOtherParticipant(selectedChat)?.name || 'User'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedChat.property?.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {selectedChat.messages?.length > 0 ? (
                      <>
                        {selectedChat.messages.map((msg, index) => {
                          const isOwn = msg.sender?._id === user._id || msg.sender === user._id;
                          return (
                            <div
                              key={index}
                              className={`mb-4 flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                              <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                  isOwn
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-800 border'
                                }`}
                              >
                                <p>{msg.content}</p>
                                <p className={`text-xs mt-1 ${isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                                  {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No messages yet. Start the conversation!</p>
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={!message.trim()}
                        className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50 flex items-center gap-2"
                      >
                        <Send className="h-5 w-5" />
                        <span className="hidden sm:inline">Send</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
