import axios from 'axios';

// In production, API is served from same origin, in dev use localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:3000');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000 // 30 seconds timeout
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      error.message = 'Request timeout. Please try again.';
    } else if (error.code === 'ERR_NETWORK') {
      console.error('Network error');
      error.message = 'Network error. Please check your connection and ensure the backend server is running.';
    } else if (!error.response) {
      console.error('No response from server');
      error.message = 'Cannot connect to server. Please ensure the backend is running on port 3000.';
    }
    return Promise.reject(error);
  }
);

/**
 * Upload files to the server
 * @param {FileList} files - Files to upload
 * @param {Function} onProgress - Progress callback
 * @returns {Promise} Upload response
 */
export const uploadFiles = async (files, onProgress) => {
  const formData = new FormData();
  
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  const response = await api.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted);
      }
    }
  });

  return response.data;
};

/**
 * Get share information by share ID
 * @param {string} shareId - The share ID
 * @returns {Promise} Share data
 */
export const getShare = async (shareId) => {
  const response = await api.get(`/api/share/${shareId}`);
  return response.data;
};

/**
 * Get download URL for a file
 * @param {string} shareId - The share ID
 * @param {string} fileId - The file ID
 * @returns {string} Download URL
 */
export const getDownloadUrl = (shareId, fileId) => {
  return `${API_BASE_URL}/api/download/${shareId}/${fileId}`;
};

/**
 * Get view URL for a file
 * @param {string} shareId - The share ID
 * @param {string} fileId - The file ID
 * @returns {string} View URL
 */
export const getViewUrl = (shareId, fileId) => {
  return `${API_BASE_URL}/api/view/${shareId}/${fileId}`;
};

export default api;
