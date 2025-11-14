import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShare } from '../services/api';
import FileViewer from '../components/FileViewer';

function ShareView() {
  const { shareId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [shareData, setShareData] = useState(null);

  useEffect(() => {
    const fetchShare = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getShare(shareId);
        
        if (data.success) {
          setShareData(data);
        } else {
          setError('Failed to load share');
        }
      } catch (err) {
        console.error('Error fetching share:', err);
        setError(
          err.response?.data?.error || 
          'Share not found. The link may be invalid or expired.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (shareId) {
      fetchShare();
    }
  }, [shareId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading shared documents...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Share Not Found</h2>
              <p className="mt-2 text-gray-600">{error}</p>
              <Link
                to="/"
                className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                Upload New Files
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Upload New Files
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Shared Documents</h1>
          <p className="mt-2 text-gray-600">
            {shareData.files.length} {shareData.files.length === 1 ? 'file' : 'files'} shared
          </p>
        </div>

        {/* Files List */}
        <div className="space-y-6">
          {shareData.files.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500">No files found in this share</p>
            </div>
          ) : (
            shareData.files.map((file) => (
              <FileViewer key={file.id} file={file} shareId={shareId} />
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="h-5 w-5 text-blue-600 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-blue-900 font-medium">About this share</p>
              <p className="text-sm text-blue-700 mt-1">
                These files were uploaded on {new Date(shareData.createdAt).toLocaleDateString()}.
                You can view and download them using the buttons above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareView;
