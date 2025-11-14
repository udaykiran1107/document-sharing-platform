# Testing Guide

This guide will help you test the Document Sharing Platform end-to-end.

## Prerequisites

Before testing, ensure you have:
1. Node.js installed (v18 or higher)
2. Both backend and frontend dependencies installed
3. Both servers running

## Setup Instructions

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start the Servers

You'll need two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
The backend should start on http://localhost:3000

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
The frontend should start on http://localhost:5173

## Testing the Application

### Test 1: Upload Single File

1. Open http://localhost:5173 in your browser
2. Click "Choose files" or drag and drop a file
3. Select a PDF, image, or text file (under 50MB)
4. Click "Upload Files"
5. Verify:
   - Upload progress bar appears
   - Success message displays
   - Share link is generated
   - Copy button works

### Test 2: Upload Multiple Files

1. On the home page, select multiple files at once
2. Verify all files appear in the selected files list
3. Click "Upload Files"
4. Verify:
   - All files upload successfully
   - Single share link is generated for all files

### Test 3: View Shared Files

1. Copy the share link from a successful upload
2. Open the link in a new browser tab (or incognito window)
3. Verify:
   - All uploaded files are listed
   - File names, sizes, and dates are displayed correctly
   - Preview works for images and PDFs
   - Download buttons are present

### Test 4: Download Files

1. On a share page, click the "Download" button for a file
2. Verify:
   - File downloads with the correct name
   - File opens correctly after download

### Test 5: File Type Validation

1. Try to upload an unsupported file type (e.g., .exe, .zip)
2. Verify:
   - Error message appears
   - Upload is prevented

### Test 6: File Size Validation

1. Try to upload a file larger than 50MB
2. Verify:
   - Error message appears
   - Upload is prevented

### Test 7: Invalid Share Link

1. Navigate to http://localhost:5173/share/invalid-id
2. Verify:
   - Error page displays
   - "Share Not Found" message appears
   - "Upload New Files" button works

### Test 8: Navigation

1. From a share page, click "Upload Files" in the header
2. Verify you're taken back to the home page
3. Test the logo link also returns to home

### Test 9: Responsive Design

1. Resize your browser window to mobile size
2. Verify:
   - Layout adjusts properly
   - All features remain accessible
   - Upload component works on mobile

### Test 10: Multiple File Types

Test uploading and viewing different file types:
- PDF documents
- Images (JPEG, PNG, GIF, WebP)
- Text files (.txt, .md)
- Office documents (.docx, .xlsx, .pptx)

Verify each type displays or downloads correctly.

## API Testing

You can also test the API directly using curl or Postman:

### Health Check
```bash
curl http://localhost:3000/health
```

### Upload File
```bash
curl -X POST http://localhost:3000/api/upload \
  -F "files=@/path/to/your/file.pdf"
```

### Get Share
```bash
curl http://localhost:3000/api/share/{shareId}
```

### Download File
```bash
curl http://localhost:3000/api/download/{shareId}/{fileId} --output downloaded-file.pdf
```

## Common Issues

### Backend won't start
- Check if Node.js is installed: `node --version`
- Ensure port 3000 is not in use
- Check for errors in the terminal

### Frontend won't start
- Ensure you're in the `frontend` directory
- Check if port 5173 is not in use
- Try deleting `node_modules` and running `npm install` again

### CORS Errors
- Ensure backend is running on port 3000
- Ensure frontend is running on port 5173
- Check browser console for specific error messages

### Upload Fails
- Check file size (must be under 50MB)
- Check file type (must be supported format)
- Ensure backend server is running
- Check backend terminal for error messages

### Files Not Displaying
- Check if files were uploaded successfully
- Verify the share ID in the URL is correct
- Check browser console for errors
- Ensure backend server is running

## Success Criteria

All tests should pass with:
- ✅ Files upload successfully
- ✅ Share links are generated
- ✅ Files can be viewed and downloaded
- ✅ Validation works correctly
- ✅ Error handling is user-friendly
- ✅ Navigation works smoothly
- ✅ Responsive design functions properly
