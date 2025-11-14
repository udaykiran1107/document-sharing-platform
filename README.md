# Document Sharing Platform

An open-source web application for uploading and sharing documents via unique URLs.

## Features

- Upload single or multiple documents
- Generate shareable links instantly
- View documents in browser
- Download documents
- Support for PDF, images, text files, and Office documents
- No account required for viewing shared documents

## Prerequisites

Before running this application, you need to install:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation

1. Install Node.js from https://nodejs.org/

2. Install dependencies:
```bash
npm install
```

3. The application will automatically create the required directories (uploads, data) on first run.

## Running the Application

### Quick Start

1. **Install Node.js** (v18 or higher) from https://nodejs.org/

2. **Install Backend Dependencies:**
```bash
npm install
```

3. **Install Frontend Dependencies:**
```bash
cd frontend
npm install
cd ..
```

4. **Start Both Servers:**

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
npm run dev
```
Backend will start on http://localhost:3000

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
Frontend will start on http://localhost:5173

5. **Open your browser** and navigate to http://localhost:5173

### Verifying the Setup

- Backend health check: http://localhost:3000/health
- Frontend: http://localhost:5173

If you see the upload interface, you're ready to go!

### Production Mode

For production deployment:

**Backend:**
```bash
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

The built frontend will be in `frontend/dist/` and can be served by any static file server.

## Environment Variables

Create a `.env` file in the root directory (already created with defaults):

```
PORT=3000
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=52428800
DATABASE_PATH=./data/database.sqlite
FRONTEND_URL=http://localhost:5173
```

## Project Structure

```
document-sharing-platform/
├── src/
│   ├── config/          # Configuration files
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Express middleware
│   └── server.js        # Main server file
├── uploads/             # Uploaded files storage
├── data/                # SQLite database
├── frontend/            # React frontend (to be created)
├── .env                 # Environment variables
└── package.json         # Dependencies
```

## API Endpoints

- `POST /api/upload` - Upload documents
- `GET /api/share/:shareId` - Get share metadata
- `GET /api/download/:shareId/:fileId` - Download file
- `GET /api/view/:shareId/:fileId` - View file inline

## Supported File Types

- PDF (.pdf)
- Images (.jpg, .jpeg, .png, .gif, .webp)
- Text files (.txt, .md)
- Office documents (.docx, .xlsx, .pptx)

## File Size Limit

Maximum file size: 50MB per file

## Running Tests

### Backend Tests

Run backend unit and integration tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Frontend Tests

Run frontend component tests:
```bash
cd frontend
npm test
```

Run tests in watch mode:
```bash
cd frontend
npm run test:watch
```

### Manual Testing

See [TESTING.md](TESTING.md) for comprehensive manual testing guide.

## Deployment

For production deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

Quick deployment with Docker:
```bash
docker-compose up -d
```

## Documentation

- [TESTING.md](TESTING.md) - Manual and automated testing guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment guide

## License

MIT
