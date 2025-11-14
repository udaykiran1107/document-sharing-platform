import React from 'react';
import { getViewUrl, getDownloadUrl } from '../services/api';

function FileViewer({ file, shareId }) {
  const viewUrl = getViewUrl(shareId, file.id);
  const downloadUrl = getDownloadUrl(shareId, file.id);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';
  const isText = file.type.startsWith('text/');

  const renderPreview = () => {
    if (isImage) {
      return (
        <div className="mt-4">
          <img
            src={viewUrl}
            alt={file.name}
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      );
    }

    if (isPDF) {
      return (
        <div className="mt-4">
          <iframe
            src={viewUrl}
            className="w-full h-96 border rounded-lg"
            title={file.name}
          />
        </div>
      );
    }

    if (isText) {
      return (
        <div className="mt-4">
          <iframe
            src={viewUrl}
            className="w-full h-64 border rounded-lg bg-white p-4"
            title={file.name}
          />
        </div>
      );
    }

    return (
      <div className="mt-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-600">Preview not available for this file type</p>
        <p className="text-xs text-gray-500 mt-1">Click download to view the file</p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate">{file.name}</h3>
          <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>{formatDate(file.uploadDate)}</span>
          </div>
        </div>
        <a
          href={downloadUrl}
          download
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download
        </a>
      </div>

      {renderPreview()}
    </div>
  );
}

export default FileViewer;
