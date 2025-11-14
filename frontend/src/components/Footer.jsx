import React from 'react';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">About DocShare</h3>
            <p className="text-sm text-gray-600">
              A simple, open-source platform for sharing documents via unique links. 
              No registration required.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Upload multiple files at once</li>
              <li>• Instant shareable links</li>
              <li>• Support for various file types</li>
              <li>• Secure file storage</li>
            </ul>
          </div>

          {/* Supported Files */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Supported Files</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• PDF documents</li>
              <li>• Images (JPEG, PNG, GIF, WebP)</li>
              <li>• Text files (TXT, MD)</li>
              <li>• Office docs (DOCX, XLSX, PPTX)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Document Sharing Platform. Open source project.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
