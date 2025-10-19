import React, { useState } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { mockLogs } from '../constants';
import type { LogEntry } from '../types';

const LogItem: React.FC<{ log: LogEntry }> = ({ log }) => (
    <tr className="border-b border-gray-700/50 hover:bg-gray-800/40">
        <td className="px-4 py-3 text-sm text-gray-400">{log.timestamp}</td>
        <td className="px-4 py-3 text-sm font-medium text-white">{log.user}</td>
        <td className="px-4 py-3 text-sm">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                log.action === 'Ban' ? 'bg-red-500/20 text-red-400' :
                log.action === 'Kick' ? 'bg-yellow-500/20 text-yellow-400' :
                log.action === 'Mute' ? 'bg-blue-500/20 text-blue-400' :
                'bg-gray-500/20 text-gray-300'
            }`}>
                {log.action}
            </span>
        </td>
        <td className="px-4 py-3 text-sm text-gray-300">{log.details}</td>
    </tr>
);

const Moderation: React.FC = () => {
    const [saveStatus, setSaveStatus] = useState('');

    const handleSaveChanges = () => {
        setSaveStatus('Saving...');
        // In a real app, this would be an API call to your backend.
        setTimeout(() => {
            setSaveStatus('Settings saved successfully! Restart your bot to apply changes.');
            setTimeout(() => setSaveStatus(''), 5000); // Hide message after 5 seconds
        }, 1000);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title="Auto-Moderation">
                    <div className="space-y-4">
                        <ToggleSwitch label="Bad Words" enabled={true} onChange={() => {}} />
                        <ToggleSwitch label="Excessive Caps" enabled={false} onChange={() => {}} />
                        <ToggleSwitch label="Spam" enabled={true} onChange={() => {}} />
                        <ToggleSwitch label="Server Invites" enabled={true} onChange={() => {}} />
                    </div>
                </Card>
                <Card title="Settings">
                     <div className="space-y-4">
                        <div>
                            <label htmlFor="mod-log-channel" className="block text-sm font-medium text-gray-300 mb-2">
                                Moderation Log Channel
                            </label>
                            <select
                                id="mod-log-channel"
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>#mod-logs</option>
                                <option>#staff-chat</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ignored-roles" className="block text-sm font-medium text-gray-300 mb-2">
                                Ignored Roles
                            </label>
                            <select
                                id="ignored-roles"
                                multiple
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option>Admin</option>
                                <option>Moderator</option>
                            </select>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex justify-end items-center gap-4">
                 {saveStatus && <p className="text-sm text-green-400 transition-opacity duration-300">{saveStatus}</p>}
                <button 
                    onClick={handleSaveChanges}
                    className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Save Changes
                </button>
            </div>
            
            <Card title="Moderation Logs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/60">
                            <tr>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Timestamp</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLogs.map(log => <LogItem key={log.id} log={log} />)}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Moderation;
