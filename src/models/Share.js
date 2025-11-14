import { v4 as uuidv4 } from 'uuid';
import { runQuery, getOne, getAll } from '../database/db.js';

export class Share {
  constructor(data) {
    this.id = data.id;
    this.shareId = data.share_id;
    this.createdAt = data.created_at;
    this.expiresAt = data.expires_at;
  }

  /**
   * Create a new share
   * @returns {Promise<Share>}
   */
  static async create() {
    const id = uuidv4();
    const shareId = uuidv4();

    const sql = `
      INSERT INTO shares (id, share_id)
      VALUES (?, ?)
    `;

    await runQuery(sql, [id, shareId]);

    return new Share({
      id,
      share_id: shareId,
      created_at: new Date().toISOString(),
      expires_at: null
    });
  }

  /**
   * Find a share by its share ID
   * @param {string} shareId
   * @returns {Promise<Share|null>}
   */
  static async findByShareId(shareId) {
    const sql = `
      SELECT * FROM shares
      WHERE share_id = ?
    `;

    const row = await getOne(sql, [shareId]);

    if (!row) {
      return null;
    }

    return new Share(row);
  }

  /**
   * Find a share by its internal ID
   * @param {string} id
   * @returns {Promise<Share|null>}
   */
  static async findById(id) {
    const sql = `
      SELECT * FROM shares
      WHERE id = ?
    `;

    const row = await getOne(sql, [id]);

    if (!row) {
      return null;
    }

    return new Share(row);
  }

  /**
   * Delete a share and its associated files
   * @param {string} shareId
   * @returns {Promise<boolean>}
   */
  static async delete(shareId) {
    const sql = `
      DELETE FROM shares
      WHERE share_id = ?
    `;

    const result = await runQuery(sql, [shareId]);
    return result.changes > 0;
  }
}
