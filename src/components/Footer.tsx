import React from 'react';
import { Recycle, Mail, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-2">
              <Recycle size={20} className="text-primary-600" />
              <span className="text-lg font-semibold text-gray-900">GreenReport</span>
            </div>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-left text-sm text-gray-500">
              &copy; {new Date().getFullYear()} GreenReport. All rights reserved.
            </p>
          </div>
          
          <div className="mt-4 flex justify-center md:mt-0 space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;