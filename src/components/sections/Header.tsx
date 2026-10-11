import React from 'react';
import { Phone } from 'lucide-react';
import { businessConfig } from '../../config/business';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-6xl">
        <div className="flex items-center gap-2">
          <Phone className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{businessConfig.name}</h1>
            <p className="text-xs text-gray-600">{businessConfig.serviceArea}</p>
          </div>
        </div>
      </nav>
    </header>
  );
};