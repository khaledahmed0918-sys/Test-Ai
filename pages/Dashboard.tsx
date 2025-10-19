import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Modal from '../components/Modal';
import CodeBlock from '../components/CodeBlock';
import type { Server } from '../types';
import { Users, Shield, MessageSquare, Star, ArrowRight, Play, Square, UploadCloud, Bot, Terminal } from 'lucide-react';

interface DashboardProps {
  server: Server | null;
  botStatus: 'online' | 'offline';
  onStartBot: () => void;
  onStopBot: () => void;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className="bg-gray-900/50 p-6 rounded-lg flex items-center space-x-4 border border-gray-700/50">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const ModuleLink: React.FC<{ icon: React.ReactNode; title: string; description: string; to: string }> = ({ icon, title, description, to }) => (
    <Link to={to} className="bg-gray-800/60 p-5 rounded-lg flex items-center space-x-4 hover:bg-gray-700/70 transition-colors duration-200 group">
        <div className="p-3 bg-gray-700 rounded-lg text-indigo-400">
            {icon}
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-white">{title}</h4>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
        <ArrowRight size={20} className="text-gray-500 group-hover:text-white transition-colors duration-200" />
    </Link>
);

const Dashboard: React.FC<DashboardProps> = ({ server, botStatus, onStartBot, onStopBot }) => {
  const [deployStatus, setDeployStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: <></> });

  const isOnline = botStatus === 'online';

  if (!server) {
    return <div>Loading server data...</div>;
  }
  
  const showModal = (title: string, body: React.ReactElement) => {
    setModalContent({ title, body });
    setIsModalOpen(true);
  };
  
  const handleStart = () => {
    onStartBot();
    showModal('How to Start Your Bot', (
      <div>
        <p className="text-gray-300 mb-2">
          This dashboard doesn't run your bot directly. For security, your browser can't start processes on your computer.
        </p>
        <p className="text-gray-300 mb-4">
          To start your bot, open a terminal in your project's root directory and run the following command:
        </p>
        <CodeBlock command="npm run start" />
        <p className="text-xs text-gray-500">
          This will log your bot into Discord. You can leave this terminal running in the background.
        </p>
      </div>
    ));
  };
  
  const handleStop = () => {
    onStopBot();
    showModal('How to Stop Your Bot', (
      <div>
        <p className="text-gray-300 mb-2">
          To stop your bot, you'll need to go back to the terminal where it's running.
        </p>
        <p className="text-gray-300 mb-4">
          Press <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-lg">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-200 bg-gray-700 border border-gray-600 rounded-lg">C</kbd> in that terminal window to shut down the bot process.
        </p>
      </div>
    ));
  };

  const handleDeploy = () => {
    setDeployStatus('Deploying...');
    setTimeout(() => {
        setDeployStatus('');
        showModal('How to Deploy Commands', (
          <div>
            <p className="text-gray-300 mb-2">
              Just like starting the bot, deploying commands must be done from your terminal.
            </p>
            <p className="text-gray-300 mb-4">
              Run this command in your project's root directory to update your bot's slash commands on Discord:
            </p>
            <CodeBlock command="npm run deploy" />
             <p className="text-xs text-gray-500 mt-4">
              You only need to do this when you add new commands or change existing ones.
            </p>
          </div>
        ));
    }, 1500);
  };
  
  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        {modalContent.body}
      </Modal>

      <div className="space-y-8">
        <Card title="Bot Management">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                  <button
                      onClick={handleStart}
                      disabled={isOnline}
                      className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                      <Play size={18} />
                      Start Bot
                  </button>
                  <button
                      onClick={handleStop}
                      disabled={!isOnline}
                      className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                      <Square size={18} />
                      Stop Bot
                  </button>
                   <button
                      onClick={handleDeploy}
                      disabled={deployStatus === 'Deploying...'}
                      className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                      <UploadCloud size={18} />
                      {deployStatus === 'Deploying...' ? 'Deploying...' : 'Deploy Commands'}
                  </button>
              </div>
          </div>
          <div className="mt-4 p-4 bg-gray-800/50 border border-gray-700 rounded-lg flex items-start gap-3">
              <Terminal size={20} className="text-yellow-400 mt-1 flex-shrink-0" />
              <div>
                  <h4 className="font-semibold text-white">Manual Control Required</h4>
                  <p className="text-xs text-gray-400 mt-1">
                      For security, this web dashboard cannot start or stop your bot. Please use the commands <code className="bg-gray-700 px-1 py-0.5 rounded-md text-gray-300">npm run start</code> and <code className="bg-gray-700 px-1 py-0.5 rounded-md text-gray-300">npm run deploy</code> in your local terminal. These buttons will guide you.
                  </p>
              </div>
          </div>
         </Card>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Users size={24} className="text-white" />} title="Total Members" value={server.memberCount.toLocaleString()} color="bg-blue-500" />
          <StatCard icon={<Users size={24} className="text-white" />} title="Online" value="312" color="bg-green-500" />
          <StatCard icon={<Shield size={24} className="text-white" />} title="Banned Users" value="12" color="bg-red-500" />
          <StatCard icon={<MessageSquare size={24} className="text-white" />} title="Roles" value="28" color="bg-yellow-500" />
        </div>
  
        <Card title="Modules">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ModuleLink to="/welcome" icon={<MessageSquare size={24} />} title="Welcome Messages" description="Greet new members automatically." />
              <ModuleLink to="/moderation" icon={<Shield size={24} />} title="Moderation" description="Keep your server clean and safe." />
              <ModuleLink to="/leveling" icon={<Star size={24} />} title="Leveling System" description="Reward active members with XP." />
              <ModuleLink to="/ai-chat" icon={<Bot size={24} />} title="AI Chat Bot" description="Engage users with a smart AI." />
          </div>
        </Card>
        
        <Card title="Recent Activity">
          <p className="text-gray-400">Activity feed coming soon...</p>
          {/* Placeholder for activity feed */}
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
