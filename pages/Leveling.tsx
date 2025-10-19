import React, { useState } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { mockLeaderboard } from '../constants';
import type { LeaderboardUser } from '../types';

const LeaderboardItem: React.FC<{ user: LeaderboardUser }> = ({ user }) => (
    <tr className="border-b border-gray-700/50 hover:bg-gray-800/40">
        <td className="px-4 py-3 text-center text-lg font-bold text-gray-400">{user.rank}</td>
        <td className="px-4 py-3">
            <div className="flex items-center space-x-3">
                <img src={user.avatarUrl} alt={user.username} className="w-10 h-10 rounded-full" />
                <span className="font-medium text-white">{user.username}</span>
            </div>
        </td>
        <td className="px-4 py-3 text-sm text-indigo-400 font-semibold">Level {user.level}</td>
        <td className="px-4 py-3 text-sm text-gray-300">{user.xp.toLocaleString()} XP</td>
    </tr>
);

const Leveling: React.FC = () => {
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
            <Card title="Leveling System">
                <div className="space-y-4">
                    <ToggleSwitch label="Enable Leveling System" enabled={true} onChange={() => {}} />
                    <div>
                        <label htmlFor="xp-rate" className="block text-sm font-medium text-gray-300 mb-2">XP Rate</label>
                        <input
                            type="range"
                            id="xp-rate"
                            min="0.5"
                            max="5"
                            step="0.1"
                            defaultValue="1"
                            className="w-full"
                        />
                    </div>
                     <div>
                        <label htmlFor="level-up-channel" className="block text-sm font-medium text-gray-300 mb-2">
                            Level Up Announcement Channel
                        </label>
                        <select
                            id="level-up-channel"
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option>Don't announce</option>
                            <option>#bot-commands</option>
                            <option>#general</option>
                        </select>
                    </div>
                </div>
            </Card>

             <div className="flex justify-end items-center gap-4">
                 {saveStatus && <p className="text-sm text-green-400 transition-opacity duration-300">{saveStatus}</p>}
                <button 
                    onClick={handleSaveChanges}
                    className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                    Save Changes
                </button>
            </div>

            <Card title="Leaderboard">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/60">
                            <tr>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Rank</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Level</th>
                                <th className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">XP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockLeaderboard.map(user => <LeaderboardItem key={user.rank} user={user} />)}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Leveling;
