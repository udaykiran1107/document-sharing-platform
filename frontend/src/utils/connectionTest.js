import api from '../services/api';

/**
 * Test connection to backend API
 * @returns {Promise<boolean>} True if connection successful
 */
export const testConnection = async () => {
  try {
    const response = await api.get('/health');
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Backend connection test failed:', error.message);
    return false;
  }
};

/**
 * Get backend status information
 * @returns {Promise<Object>} Backend status
 */
export const getBackendStatus = async () => {
  try {
    const response = await api.get('/health');
    return {
      connected: true,
      message: response.data.message,
      status: response.data.status
    };
  } catch (error) {
    return {
      connected: false,
      message: error.message,
      error: true
    };
  }
};
