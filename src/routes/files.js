import express from 'express';
import path from 'path';
import fs from 'fs';
import { File } from '../models/File.js';
import { Share } from '../models/Share.js';
import { config } from '../config/config.js';

const router = express.Router();

/**
 * Helper function to validate and retrieve file
 */
async function validateAndGetFile(shareId, fileId) {
  // Validate share exists
  const share = await Share.findByShareId(shareId);
  if (!share) {
    return { error: 'Share not found', status: 404 };
  }

  // Validate file exists and belongs to share
  const file = await File.findByShareIdAndFileId(shareId, fileId);
  if (!file) {
    return { error: 'File not found', status: 404 };
  }

  // Check if file exists on disk
  const filePath = path.join(config.uploadDir, shareId, file.storedName);
  if (!fs.existsSync(filePath)) {
    return { error: 'File not found on server', status: 404 };
  }

  return { file, filePath };
}

/**
 * GET /api/download/:shareId/:fileId
 * Download a specific file
 */
router.get('/download/:shareId/:fileId', async (req, res) => {
  try {
    const { shareId, fileId } = req.params;

    // Validate and get file
    const result = await validateAndGetFile(shareId, fileId);
    
    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error
      });
    }

    const { file, filePath } = result;

    // Set headers for download
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(file.originalName)}"`);
    res.setHeader('Content-Length', file.size);

    // Stream file to response
    const fileStream = fs.createReadStream(filePath);
    
    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Error reading file'
        });
      }
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Failed to download file. Please try again.'
      });
    }
  }
});

/**
 * GET /api/view/:shareId/:fileId
 * View a file inline (in browser)
 */
router.get('/view/:shareId/:fileId', async (req, res) => {
  try {
    const { shareId, fileId } = req.params;

    // Validate and get file
    const result = await validateAndGetFile(shareId, fileId);
    
    if (result.error) {
      return res.status(result.status).json({
        success: false,
        error: result.error
      });
    }

    const { file, filePath } = result;

    // Set headers for inline viewing
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(file.originalName)}"`);
    res.setHeader('Content-Length', file.size);

    // Stream file to response
    const fileStream = fs.createReadStream(filePath);
    
    fileStream.on('error', (error) => {
      console.error('File stream error:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          error: 'Error reading file'
        });
      }
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error('View error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Failed to view file. Please try again.'
      });
    }
  }
});

export default router;
