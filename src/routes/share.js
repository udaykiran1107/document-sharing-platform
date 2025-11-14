import express from 'express';
import { Share } from '../models/Share.js';
import { File } from '../models/File.js';

const router = express.Router();

/**
 * GET /api/share/:shareId
 * Retrieve share metadata and associated files
 */
router.get('/:shareId', async (req, res) => {
  try {
    const { shareId } = req.params;

    // Validate shareId parameter
    if (!shareId) {
      return res.status(400).json({
        success: false,
        error: 'Share ID is required'
      });
    }

    // Find the share
    const share = await Share.findByShareId(shareId);

    if (!share) {
      return res.status(404).json({
        success: false,
        error: 'Share not found. The link may be invalid or expired.'
      });
    }

    // Get all files associated with this share
    const files = await File.findByShareId(shareId);

    // Return share metadata with files
    res.json({
      success: true,
      shareId: share.shareId,
      createdAt: share.createdAt,
      files: files.map(file => ({
        id: file.id,
        name: file.originalName,
        size: file.size,
        type: file.mimeType,
        uploadDate: file.uploadDate
      }))
    });
  } catch (error) {
    console.error('Error retrieving share:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve share. Please try again.'
    });
  }
});

export default router;
