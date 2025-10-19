import React, { useState } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';

const Welcome: React.FC = () => {
    const [welcomeEnabled, setWelcomeEnabled] = useState(true);
    const [dmWelcomeEnabled, setDmWelcomeEnabled] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState('Welcome {user} to the server! Enjoy your stay.');
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
        <div className="max-w-4xl mx-auto space-y-6">
            <Card title="Welcome Message Settings">
                <div className="space-y-6">
                    <ToggleSwitch label="Send a message when a user joins" enabled={welcomeEnabled} onChange={setWelcomeEnabled} />
                    
                    <div>
                        <label htmlFor="welcome-channel" className="block text-sm font-medium text-gray-300 mb-2">
                            Welcome Channel
                        </label>
                        <select
                            id="welcome-channel"
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option>#general</option>
                            <option>#welcome</option>
                            <option>#announcements</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="welcome-message" className="block text-sm font-medium text-gray-300 mb-2">
                            Welcome Message
                        </label>
                        <textarea
                            id="welcome-message"
                            rows={4}
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={welcomeMessage}
                            onChange={(e) => setWelcomeMessage(e.target.value)}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Available placeholders: <code>{'{user}'}</code> for username, <code>{'{server}'}</code> for server name.
                        </p>
                    </div>
                </div>
            </Card>

            <Card title="Direct Message on Join">
                <ToggleSwitch label="Send a private message to new users" enabled={dmWelcomeEnabled} onChange={setDmWelcomeEnabled} />
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
        </div>
    );
};

export default Welcome;
