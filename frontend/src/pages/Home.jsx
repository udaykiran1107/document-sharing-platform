import React from 'react';
import Upload from '../components/Upload';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Share Documents Instantly
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Upload and share documents with unique links. No account required, no hassle.
          </p>
        </div>
        
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
          <Upload />
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Upload Files</h3>
              <p className="text-sm text-gray-600">
                Select or drag and drop your documents. Multiple files supported.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Get Link</h3>
              <p className="text-sm text-gray-600">
                Receive a unique shareable link instantly after upload.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Share</h3>
              <p className="text-sm text-gray-600">
                Send the link to anyone. They can view and download your files.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-medium text-gray-800">No Registration</h4>
                <p className="text-sm text-gray-600">Start sharing immediately without creating an account</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-medium text-gray-800">Multiple Files</h4>
                <p className="text-sm text-gray-600">Upload and share multiple documents at once</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-medium text-gray-800">Various Formats</h4>
                <p className="text-sm text-gray-600">PDF, images, text files, and Office documents</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="font-medium text-gray-800">Secure Links</h4>
                <p className="text-sm text-gray-600">Unique, non-guessable URLs for each share</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
