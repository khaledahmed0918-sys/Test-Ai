
import React from 'react';
import { NavLink } from 'react-router-dom';
import type { Server } from '../types';
import { Home, MessageSquare, Shield, Star, Bot, BarChart2 } from 'lucide-react';

interface SidebarProps {
  server: Server | null;
}

const iconComponents = {
  Home: <Home size={20} />,
  Welcome: <MessageSquare size={20} />,
  Moderation: <Shield size={20} />,
  Leveling: <Star size={20} />,
  AIChat: <Bot size={20} />,
  Analytics: <BarChart2 size={20} />,
};

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'Home' },
  { path: '/welcome', label: 'Welcome', icon: 'Welcome' },
  { path: '/moderation', label: 'Moderation', icon: 'Moderation' },
  { path: '/leveling', label: 'Leveling', icon: 'Leveling' },
  { path: '/ai-chat', label: 'AI Chat', icon: 'AIChat' },
  { path: '/analytics', label: 'Analytics', icon: 'Analytics' },
];

const Sidebar: React.FC<SidebarProps> = ({ server }) => {
  return (
    <div className="w-64 bg-gray-900/70 backdrop-blur-md border-r border-gray-700/50 flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700/50">
        {server && (
          <div className="flex items-center space-x-3">
            <img src={server.iconUrl} alt={server.name} className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold text-white">{server.name}</span>
          </div>
        )}
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 my-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg'
                      : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                  }`
                }
              >
                {iconComponents[item.icon as keyof typeof iconComponents]}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700/50 text-center">
        <a href="#" className="text-xs text-gray-500 hover:text-indigo-400">Change Server</a>
      </div>
    </div>
  );
};

export default Sidebar;
   