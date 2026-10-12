import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-xl">⚡</span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Sports-IQ</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-sm">
              Real-time multi-sport scores, fixtures, live stats, and local sports venue booking.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Live Scores
            </Link>
            <Link to="/facilities" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Find Facilities
            </Link>
            <span className="text-gray-400 dark:text-gray-600">
              © {new Date().getFullYear()} Sports-IQ. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
