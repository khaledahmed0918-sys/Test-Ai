
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', footer }) => {
  return (
    <div className={`bg-gray-900/50 rounded-lg shadow-xl border border-gray-700/50 ${className}`}>
      <div className="p-5 border-b border-gray-700/50">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-5">
        {children}
      </div>
      {footer && (
        <div className="bg-gray-900/30 px-5 py-3 border-t border-gray-700/50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
   