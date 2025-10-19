
import React from 'react';
import type { User } from '../types';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  serverName: string;
  pageTitle: string;
  onLogout: () => void;
  botStatus: 'online' | 'offline';
}

const Header: React.FC<HeaderProps> = ({ user, pageTitle, onLogout, botStatus }) => {
  const isOnline = botStatus === 'online';

  return (
    <header className="flex items-center justify-between h-20 px-8 bg-gray-900/70 backdrop-blur-md border-b border-gray-700/50">
      <h1 className="text-2xl font-semibold text-white">{pageTitle}</h1>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 mr-4">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
            Bot {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        {user && (
          <div className="flex items-center space-x-3">
            <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full" />
            <div>
              <div className="font-medium text-white">{user.username}</div>
              <div className="text-xs text-gray-400">#{user.discriminator}</div>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors duration-200"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
