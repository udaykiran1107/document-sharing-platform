import React, { useState, useRef } from 'react';
import { uploadFiles } from '../services/api';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const SUPPORTED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const validateFiles = (files) => {
    const errors = [];
    
    for (let file of files) {
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds 50MB limit`);
      }
      
      // Check file type
      if (!SUPPORTED_TYPES.includes(file.type)) {
        errors.push(`${file.name} has unsupported file type`);
      }
    }
    
    return errors;
  };

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files);
    const validationErrors = validateFiles(fileArray);
    
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }
    
    setSelectedFiles(fileArray);
    setError('');
    setShareUrl('');
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const dataTransfer = new DataTransfer();
      selectedFiles.forEach(file => dataTransfer.items.add(file));
      
      const response = await uploadFiles(
        dataTransfer.files,
        (progress) => setUploadProgress(progress)
      );

      if (response.success) {
        setShareUrl(response.shareUrl);
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Drag and Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
          className="hidden"
          id="file-input"
        />
        
        <div className="space-y-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          
          <div>
            <label
              htmlFor="file-input"
              className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
            >
              Choose files
            </label>
            <span className="text-gray-600"> or drag and drop</span>
          </div>
          
          <p className="text-sm text-gray-500">
            PDF, images, text files, Office documents (max 50MB each)
          </p>
        </div>
      </div>

      {/* Selected Files List */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-2">
            Selected Files ({selectedFiles.length})
          </h3>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-700 truncate">{file.name}</span>
                <span className="text-gray-500 ml-2">{formatFileSize(file.size)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Upload Button */}
      {selectedFiles.length > 0 && !shareUrl && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-4 w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>
      )}

      {/* Share Link */}
      {shareUrl && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">Upload Successful!</h3>
          <p className="text-sm text-green-700 mb-3">
            Share this link with others to give them access to your files:
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-3 py-2 border border-green-300 rounded bg-white text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium text-sm"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Upload;
