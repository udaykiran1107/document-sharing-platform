import express from 'express';
import path from 'path';
import { upload, handleMulterError } from '../middleware/upload.js';
import { Share } from '../models/Share.js';
import { File } from '../models/File.js';
import { config } from '../config/config.js';

const router = express.Router();

/**
 * POST /api/upload
 * Upload one or multiple files and create a share
 */
router.post('/', async (req, res, next) => {
  try {
    // Create a new share first
    const share = await Share.create();
    
    // Set share directory for multer
    req.shareDir = path.join(config.uploadDir, share.shareId);
    
    // Process upload with multer
    upload.array('files', 20)(req, res, async (err) => {
      if (err) {
        return handleMulterError(err, req, res, next);
      }

      // Check if files were uploaded
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files provided. Please select at least one file to upload.'
        });
      }

      try {
        // Save file metadata to database
        const fileRecords = [];
        for (const file of req.files) {
          const fileRecord = await File.create({
            shareId: share.shareId,
            originalName: file.originalname,
            storedName: file.filename,
            mimeType: file.mimetype,
            size: file.size
          });
          fileRecords.push(fileRecord);
        }

        // Construct share URL using frontend URL
        const shareUrl = `${config.frontendUrl}/share/${share.shareId}`;

        // Return success response
        res.status(201).json({
          success: true,
          shareId: share.shareId,
          shareUrl: shareUrl,
          files: fileRecords.map(f => ({
            id: f.id,
            originalName: f.originalName,
            size: f.size,
            mimeType: f.mimeType
          }))
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        res.status(500).json({
          success: false,
          error: 'Failed to save file metadata. Please try again.'
        });
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Upload failed. Please try again.'
    });
  }
});

export default router;
