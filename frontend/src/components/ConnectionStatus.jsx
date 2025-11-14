import React, { useState, useEffect } from 'react';
import { testConnection } from '../utils/connectionTest';

function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await testConnection();
      setIsConnected(connected);
      
      // Show banner only if disconnected
      if (!connected) {
        setShowBanner(true);
      }
    };

    // Check on mount
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!showBanner || isConnected) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium">
            Cannot connect to backend server. Please ensure the server is running on port 3000.
          </span>
        </div>
        <button
          onClick={() => setShowBanner(false)}
          className="text-white hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ConnectionStatus;
