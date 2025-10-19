import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CodeBlockProps {
  command: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-md p-4 flex items-center justify-between my-4">
      <pre>
        <code className="text-indigo-300 font-mono text-sm">{command}</code>
      </pre>
      <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors" aria-label="Copy command">
        {copied ? <Check size={18} className="text-green-400" /> : <Clipboard size={18} />}
      </button>
    </div>
  );
};

export default CodeBlock;
