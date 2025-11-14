import { v4 as uuidv4 } from 'uuid';
import { runQuery, getOne, getAll } from '../database/db.js';

export class File {
  constructor(data) {
    this.id = data.id;
    this.shareId = data.share_id;
    this.originalName = data.original_name;
    this.storedName = data.stored_name;
    this.mimeType = data.mime_type;
    this.size = data.size;
    this.uploadDate = data.upload_date;
  }

  /**
   * Create a new file record
   * @param {Object} fileData
   * @param {string} fileData.shareId - The share ID this file belongs to
   * @param {string} fileData.originalName - Original filename
   * @param {string} fileData.storedName - Stored filename on disk
   * @param {string} fileData.mimeType - MIME type of the file
   * @param {number} fileData.size - File size in bytes
   * @returns {Promise<File>}
   */
  static async create({ shareId, originalName, storedName, mimeType, size }) {
    const id = uuidv4();

    const sql = `
      INSERT INTO files (id, share_id, original_name, stored_name, mime_type, size)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await runQuery(sql, [id, shareId, originalName, storedName, mimeType, size]);

    return new File({
      id,
      share_id: shareId,
      original_name: originalName,
      stored_name: storedName,
      mime_type: mimeType,
      size,
      upload_date: new Date().toISOString()
    });
  }

  /**
   * Find all files associated with a share ID
   * @param {string} shareId
   * @returns {Promise<File[]>}
   */
  static async findByShareId(shareId) {
    const sql = `
      SELECT * FROM files
      WHERE share_id = ?
      ORDER BY upload_date ASC
    `;

    const rows = await getAll(sql, [shareId]);
    return rows.map(row => new File(row));
  }

  /**
   * Find a specific file by ID
   * @param {string} fileId
   * @returns {Promise<File|null>}
   */
  static async findById(fileId) {
    const sql = `
      SELECT * FROM files
      WHERE id = ?
    `;

    const row = await getOne(sql, [fileId]);

    if (!row) {
      return null;
    }

    return new File(row);
  }

  /**
   * Find a file by share ID and file ID
   * @param {string} shareId
   * @param {string} fileId
   * @returns {Promise<File|null>}
   */
  static async findByShareIdAndFileId(shareId, fileId) {
    const sql = `
      SELECT * FROM files
      WHERE share_id = ? AND id = ?
    `;

    const row = await getOne(sql, [shareId, fileId]);

    if (!row) {
      return null;
    }

    return new File(row);
  }

  /**
   * Delete a file record
   * @param {string} fileId
   * @returns {Promise<boolean>}
   */
  static async delete(fileId) {
    const sql = `
      DELETE FROM files
      WHERE id = ?
    `;

    const result = await runQuery(sql, [fileId]);
    return result.changes > 0;
  }

  /**
   * Delete all files associated with a share
   * @param {string} shareId
   * @returns {Promise<number>} Number of files deleted
   */
  static async deleteByShareId(shareId) {
    const sql = `
      DELETE FROM files
      WHERE share_id = ?
    `;

    const result = await runQuery(sql, [shareId]);
    return result.changes;
  }
}
