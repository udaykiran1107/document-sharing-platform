import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 52428800, // 50MB
  databasePath: process.env.DATABASE_PATH || './data/database.sqlite',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  supportedMimeTypes: [
    // PDF
    'application/pdf',
    // Images
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    // Text
    'text/plain',
    'text/markdown',
    // Documents
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
    'application/vnd.openxmlformats-officedocument.presentationml.presentation' // PPTX
  ]
};
