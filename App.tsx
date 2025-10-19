import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/charts/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Welcome from './pages/Welcome';
import Moderation from './pages/Moderation';
import Leveling from './pages/Leveling';
import AIChat from './pages/AIChat';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import ServerSelector from './pages/ServerSelector';
import { mockUser, mockServers, MOCK_SERVER_ID } from './constants';
import type { User, Server } from './types';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [servers, setServers] = useState<Server[]>([]);
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);
    const [botStatus, setBotStatus] = useState<'online' | 'offline'>('offline');

    useEffect(() => {
        // Simulate checking auth status
        if (isAuthenticated) {
            setUser(mockUser);
            setServers(mockServers);
            const defaultServer = mockServers.find(s => s.id === MOCK_SERVER_ID);
            setSelectedServer(defaultServer || null);
        } else {
            setUser(null);
            setServers([]);
            setSelectedServer(null);
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setBotStatus('offline'); // Reset bot status on logout
    };

    const handleSelectServer = (serverId: string) => {
        const server = servers.find(s => s.id === serverId);
        setSelectedServer(server || null);
    };

    const handleStartBot = () => {
        // In a real app, this would trigger a backend API call
        console.log("Simulating bot start via 'npm run start'...");
        setBotStatus('online');
    };

    const handleStopBot = () => {
        // In a real app, this would trigger a backend API call
        console.log("Simulating bot stop...");
        setBotStatus('offline');
    };

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} />;
    }

    if (!selectedServer) {
        return <ServerSelector servers={servers} onSelectServer={handleSelectServer} user={user} onLogout={handleLogout} />;
    }
    
    return (
        <HashRouter>
            <MainLayout user={user} server={selectedServer} onLogout={handleLogout} botStatus={botStatus}>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard server={selectedServer} botStatus={botStatus} onStartBot={handleStartBot} onStopBot={handleStopBot} />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/moderation" element={<Moderation />} />
                    <Route path="/leveling" element={<Leveling />} />
                    <Route path="/ai-chat" element={<AIChat />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </MainLayout>
        </HashRouter>
    );
};

interface MainLayoutProps {
    children: React.ReactNode;
    user: User | null;
    server: Server | null;
    onLogout: () => void;
    botStatus: 'online' | 'offline';
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, user, server, onLogout, botStatus }) => {
    const location = useLocation();
    const getPageTitle = () => {
        const path = location.pathname.replace('/', '');
        if (path === 'ai-chat') return 'AI Chat';
        return path.charAt(0).toUpperCase() + path.slice(1);
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
            <Sidebar server={server} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={user} serverName={server?.name || 'Dashboard'} onLogout={onLogout} pageTitle={getPageTitle()} botStatus={botStatus} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default App;