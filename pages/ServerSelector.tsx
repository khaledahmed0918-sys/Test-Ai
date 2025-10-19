
import React from 'react';
import type { Server, User } from '../types';
import { LogOut } from 'lucide-react';

interface ServerSelectorProps {
    servers: Server[];
    user: User | null;
    onSelectServer: (serverId: string) => void;
    onLogout: () => void;
}

const ServerSelector: React.FC<ServerSelectorProps> = ({ servers, user, onSelectServer, onLogout }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4 relative">
             <div className="absolute top-4 right-4 flex items-center space-x-4">
                {user && (
                    <div className="flex items-center space-x-3">
                        <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full" />
                        <span className="font-medium text-white">{user.username}#{user.discriminator}</span>
                    </div>
                )}
                <button onClick={onLogout} className="p-2 rounded-full text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors duration-200">
                    <LogOut size={20} />
                </button>
            </div>
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Select a Server</h1>
                <p className="text-gray-400 mb-10">Choose a server to start managing its settings.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servers.map((server) => (
                        <button
                            key={server.id}
                            onClick={() => onSelectServer(server.id)}
                            className="bg-gray-800 p-6 rounded-lg flex flex-col items-center space-y-4 hover:bg-gray-700/80 transform hover:-translate-y-1 transition-all duration-300 shadow-lg border border-gray-700/50"
                        >
                            <img src={server.iconUrl} alt={server.name} className="w-20 h-20 rounded-full" />
                            <h2 className="text-lg font-semibold text-white">{server.name}</h2>
                            <span className="text-sm text-gray-400">{server.memberCount} members</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServerSelector;
   