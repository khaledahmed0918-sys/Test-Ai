
import React from 'react';
import { Bot } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
            <div className="max-w-md w-full text-center">
                <div className="inline-block p-4 bg-indigo-600 rounded-full mb-6">
                    <Bot size={48} className="text-white" />
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">Discord Bot Dashboard</h1>
                <p className="text-gray-400 mb-8">Manage your Discord server with ease and power.</p>
                <button
                    onClick={onLogin}
                    className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-indigo-500/50"
                >
                    <span>Login with Discord</span>
                </button>
                <p className="text-xs text-gray-500 mt-6">
                    By logging in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default Login;
   