import React, { useState } from 'react';
import Card from '../components/Card';
import ToggleSwitch from '../components/ToggleSwitch';
import { Bot } from 'lucide-react';

const AIChat: React.FC = () => {
    const [aiChatEnabled, setAiChatEnabled] = useState(true);
    const [systemInstruction, setSystemInstruction] = useState('You are a helpful and friendly assistant in a Discord server.');
    const [saveStatus, setSaveStatus] = useState('');

    const handleSaveChanges = () => {
        setSaveStatus('Saving...');
        // In a real app, this would be an API call to your backend to update the bot's personality.
        setTimeout(() => {
            setSaveStatus('Settings saved successfully! Restart your bot to apply changes.');
            setTimeout(() => setSaveStatus(''), 5000); // Hide message after 5 seconds
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Card title="AI Chat Settings">
                <div className="space-y-6">
                    <ToggleSwitch label="Enable AI Chat Command (/ask-ai)" enabled={aiChatEnabled} onChange={setAiChatEnabled} />
                    
                    <div>
                        <label htmlFor="ai-personality" className="block text-sm font-medium text-gray-300 mb-2">
                            AI Personality (System Instruction)
                        </label>
                        <textarea
                            id="ai-personality"
                            rows={4}
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            value={systemInstruction}
                            onChange={(e) => setSystemInstruction(e.target.value)}
                            placeholder="e.g., You are a pirate who speaks in sea shanties."
                        />
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
                </div>
            </Card>

            <Card title="How to Test AI Response">
                <div className="text-center p-4">
                    <Bot size={40} className="mx-auto text-indigo-400 mb-4" />
                    <p className="text-gray-300">
                        To test the AI, go to your Discord server and use the <code className="bg-gray-900 px-2 py-1 rounded">/ask-ai</code> command.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Example: <code className="bg-gray-900 px-2 py-1 rounded">/ask-ai prompt: What is the capital of France?</code>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default AIChat;
