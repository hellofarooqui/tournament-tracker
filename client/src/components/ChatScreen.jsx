import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, Reply, Smile, MoreVertical, Edit2, Trash2, Search, Users } from 'lucide-react';

export default function TournamentChat({ tournamentId, userId, token }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const emojis = ['👍', '❤️', '😂', '😮', '😢', '🎉', '🔥', '👏'];

  // Initialize Socket.io
  useEffect(() => {
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: { token }
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket');
      socket.emit('join:tournament', { tournamentId });
    });

    // Listen for events
    socket.on('message:new', (message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    socket.on('message:edited', (message) => {
      setMessages(prev => prev.map(m => m._id === message._id ? message : m));
    });

    socket.on('message:deleted', ({ messageId }) => {
      setMessages(prev => prev.filter(m => m._id !== messageId));
    });

    socket.on('message:reaction', ({ messageId, reactions }) => {
      setMessages(prev => prev.map(m => 
        m._id === messageId ? { ...m, reactions } : m
      ));
    });

    socket.on('user:online', ({ userId }) => {
      setOnlineUsers(prev => [...new Set([...prev, userId])]);
    });

    socket.on('user:offline', ({ userId }) => {
      setOnlineUsers(prev => prev.filter(id => id !== userId));
    });

    socket.on('user:typing', ({ userId }) => {
      setIsTyping(prev => ({ ...prev, [userId]: true }));
    });

    socket.on('user:stoppedTyping', ({ userId }) => {
      setIsTyping(prev => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
    });

    socket.on('messages:read', ({ userId, messageIds }) => {
      setMessages(prev => prev.map(m => {
        if (messageIds.includes(m._id)) {
          return {
            ...m,
            readBy: [...(m.readBy || []), { user: userId, readAt: new Date() }]
          };
        }
        return m;
      }));
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      alert(error.message);
    });

    return () => {
      socket.emit('leave:tournament', { tournamentId });
      socket.disconnect();
    };
  }, [tournamentId, token]);

  // Load initial messages
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/chat/${tournamentId}/messages?page=${page}&limit=50`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      
      setMessages(prev => [...data.messages, ...prev]);
      setHasMore(data.pagination.hasMore);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    if (editingMessage) {
      socketRef.current.emit('message:edit', {
        messageId: editingMessage._id,
        content: newMessage
      });
      setEditingMessage(null);
    } else {
      socketRef.current.emit('message:send', {
        tournamentId,
        content: newMessage,
        replyTo: replyTo?._id
      });
      setReplyTo(null);
    }

    setNewMessage('');
  };

  const handleTyping = () => {
    socketRef.current.emit('typing:start', { tournamentId });

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit('typing:stop', { tournamentId });
    }, 1000);
  };

  const handleReaction = (messageId, emoji) => {
    socketRef.current.emit('message:react', { messageId, emoji });
    setShowEmojiPicker(null);
  };

  const handleDeleteMessage = (messageId) => {
    if (confirm('Are you sure you want to delete this message?')) {
      socketRef.current.emit('message:delete', { messageId, tournamentId });
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setNewMessage(message.content);
  };

  const markMessagesAsRead = () => {
    const unreadMessages = messages
      .filter(m => m.sender._id !== userId && !m.readBy?.some(r => r.user === userId))
      .map(m => m._id);

    if (unreadMessages.length > 0) {
      socketRef.current.emit('messages:markRead', {
        tournamentId,
        messageIds: unreadMessages
      });
    }
  };

  useEffect(() => {
    markMessagesAsRead();
  }, [messages]);

  const filteredMessages = searchQuery
    ? messages.filter(m => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Tournament Chat</h2>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <Users size={16} />
            {onlineUsers.length} online
          </p>
        </div>
        
        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading && page === 1 && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        )}

        {hasMore && (
          <button
            onClick={loadMessages}
            disabled={loading}
            className="w-full py-2 text-blue-600 hover:bg-blue-50 rounded"
          >
            {loading ? 'Loading...' : 'Load More Messages'}
          </button>
        )}

        {filteredMessages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
            isOwn={message.sender._id === userId}
            onReply={() => setReplyTo(message)}
            onEdit={() => handleEditMessage(message)}
            onDelete={() => handleDeleteMessage(message._id)}
            onReaction={(emoji) => handleReaction(message._id, emoji)}
            showEmojiPicker={showEmojiPicker === message._id}
            setShowEmojiPicker={(show) => setShowEmojiPicker(show ? message._id : null)}
            emojis={emojis}
          />
        ))}

        {/* Typing Indicator */}
        {Object.keys(isTyping).length > 0 && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            <span>Someone is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Reply Preview */}
      {replyTo && (
        <div className="bg-blue-50 border-l-4 border-blue-500 px-4 py-2 mx-4 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">
              Replying to {replyTo.sender.firstName}
            </p>
            <p className="text-sm text-blue-700 truncate">{replyTo.content}</p>
          </div>
          <button onClick={() => setReplyTo(null)} className="text-blue-600 hover:text-blue-800">
            ✕
          </button>
        </div>
      )}

      {/* Edit Preview */}
      {editingMessage && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 px-4 py-2 mx-4 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-900">Editing message</p>
          </div>
          <button onClick={() => { setEditingMessage(null); setNewMessage(''); }} className="text-yellow-600 hover:text-yellow-800">
            ✕
          </button>
        </div>
      )}

      {/* Input Box */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ 
  message, 
  isOwn, 
  onReply, 
  onEdit, 
  onDelete, 
  onReaction,
  showEmojiPicker,
  setShowEmojiPicker,
  emojis
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-md ${isOwn ? 'bg-blue-600 text-white' : 'bg-white'} rounded-lg shadow p-3 relative group`}>
        {/* Sender Name */}
        {!isOwn && (
          <p className="text-xs font-semibold text-gray-900 mb-1">
            {message.sender.firstName} {message.sender.lastName}
          </p>
        )}

        {/* Reply Preview */}
        {message.replyTo && (
          <div className={`text-xs ${isOwn ? 'bg-blue-700' : 'bg-gray-100'} p-2 rounded mb-2 border-l-2 ${isOwn ? 'border-blue-400' : 'border-gray-400'}`}>
            <p className={`font-medium ${isOwn ? 'text-blue-200' : 'text-gray-600'}`}>
              {message.replyTo.sender?.firstName}
            </p>
            <p className={`truncate ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
              {message.replyTo.content}
            </p>
          </div>
        )}

        {/* Message Content */}
        <p className={`${isOwn ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </p>

        {/* Edited Badge */}
        {message.isEdited && (
          <span className={`text-xs ${isOwn ? 'text-blue-200' : 'text-gray-500'} italic ml-2`}>
            (edited)
          </span>
        )}

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {Object.entries(
              message.reactions.reduce((acc, r) => {
                acc[r.emoji] = (acc[r.emoji] || 0) + 1;
                return acc;
              }, {})
            ).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => onReaction(emoji)}
                className={`text-xs px-2 py-1 rounded-full ${
                  isOwn ? 'bg-blue-700' : 'bg-gray-100'
                } hover:scale-110 transition`}
              >
                {emoji} {count}
              </button>
            ))}
          </div>
        )}

        {/* Timestamp and Read Status */}
        <div className={`text-xs mt-1 ${isOwn ? 'text-blue-200' : 'text-gray-500'} flex items-center gap-2`}>
          <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {isOwn && message.readBy && message.readBy.length > 1 && (
            <span className="text-xs">✓✓</span>
          )}
        </div>

        {/* Actions Menu */}
        <div className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
          >
            <Smile size={16} />
          </button>
          <button
            onClick={onReply}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
          >
            <Reply size={16} />
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded-full"
          >
            <MoreVertical size={16} />
          </button>
        </div>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-2 flex gap-1 z-10">
            {emojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => {
                  onReaction(emoji);
                  setShowEmojiPicker(false);
                }}
                className="text-2xl hover:scale-125 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Context Menu */}
        {showMenu && (
          <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg py-1 z-10 min-w-[120px]">
            {isOwn && (
              <>
                <button
                  onClick={() => { onEdit(); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-gray-700"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => { onDelete(); setShowMenu(false); }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
