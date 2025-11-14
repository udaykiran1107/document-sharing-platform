import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/config.js';

// Ensure upload directory exists
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create share-specific directory (will be set in the route handler)
    const shareDir = req.shareDir || config.uploadDir;
    if (!fs.existsSync(shareDir)) {
      fs.mkdirSync(shareDir, { recursive: true });
    }
    cb(null, shareDir);
  },
  filename: (req, file, cb) => {
    // Generate UUID-based filename with original extension
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  // Check MIME type
  if (config.supportedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Supported types: PDF, images (JPEG, PNG, GIF, WebP), text files (TXT, MD), and Office documents (DOCX, XLSX, PPTX).`), false);
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: config.maxFileSize
  }
});

// Error handler for multer errors
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        error: `File too large. Maximum size is ${config.maxFileSize / (1024 * 1024)}MB`
      });
    }
    return res.status(400).json({
      success: false,
      error: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      error: err.message
    });
  }
  next();
};
