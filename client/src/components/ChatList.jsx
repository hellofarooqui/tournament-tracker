import { useState, useEffect } from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';

export default function ChatList({ token, userId, onSelectTournament }) {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLiveTournaments();
  }, []);

  const fetchLiveTournaments = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/chat/tournaments`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setTournaments(data.tournaments);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chats...</p>
        </div>
      </div>
    );
  }

  if (tournaments.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Active Chats</h2>
          <p className="text-gray-500">Join a live tournament to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
        <p className="text-sm text-gray-500">{tournaments.length} active tournament{tournaments.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Tournament List */}
      <div className="flex-1 overflow-y-auto">
        {tournaments.map((tournament) => (
          <TournamentChatItem
            key={tournament._id}
            tournament={tournament}
            onClick={() => onSelectTournament(tournament._id)}
          />
        ))}
      </div>
    </div>
  );
}

function TournamentChatItem({ tournament, onClick }) {
  const hasUnread = tournament.unreadCount > 0;

  return (
    <div
      onClick={onClick}
      className="bg-white border-b px-4 py-4 hover:bg-gray-50 cursor-pointer transition active:bg-gray-100"
    >
      <div className="flex items-center gap-3">
        {/* Tournament Image */}
        <div className="relative">
          {tournament.bannerImage ? (
            <img
              src={tournament.bannerImage}
              alt={tournament.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {tournament.name.charAt(0)}
            </div>
          )}
          
          {/* Live Badge */}
          <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
            LIVE
          </div>
        </div>

        {/* Tournament Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold text-gray-800 truncate ${hasUnread ? 'font-bold' : ''}`}>
              {tournament.name}
            </h3>
            {tournament.lastMessage && (
              <span className={`text-xs ${hasUnread ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                {formatLastMessageTime(tournament.lastMessage.createdAt)}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            {tournament.lastMessage ? (
              <p className={`text-sm truncate ${hasUnread ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                <span className="font-medium">
                  {tournament.lastMessage.sender.firstName}:
                </span>{' '}
                {tournament.lastMessage.content}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">No messages yet</p>
            )}

            {hasUnread && (
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                  {tournament.unreadCount > 99 ? '99+' : tournament.unreadCount}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Arrow Icon */}
        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  );
}

function formatLastMessageTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now - date) / (1000 * 60 * 60);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
}
