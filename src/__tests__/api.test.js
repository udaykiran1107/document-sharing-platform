import request from 'supertest';
import express from 'express';
import cors from 'cors';
import shareRouter from '../routes/share.js';
import { initializeDatabase } from '../database/db.js';
import { Share } from '../models/Share.js';
import { File } from '../models/File.js';
import fs from 'fs';

// Use test database
process.env.DATABASE_PATH = './data/test-api-database.sqlite';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/share', shareRouter);

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(() => {
  if (fs.existsSync('./data/test-api-database.sqlite')) {
    fs.unlinkSync('./data/test-api-database.sqlite');
  }
});

describe('Share API Endpoints', () => {
  describe('GET /api/share/:shareId', () => {
    test('should return share with files', async () => {
      // Create test share and file
      const share = await Share.create();
      await File.create({
        shareId: share.shareId,
        originalName: 'test.pdf',
        storedName: 'uuid-test.pdf',
        mimeType: 'application/pdf',
        size: 1024
      });

      const response = await request(app)
        .get(`/api/share/${share.shareId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.shareId).toBe(share.shareId);
      expect(response.body.files).toHaveLength(1);
      expect(response.body.files[0].name).toBe('test.pdf');
    });

    test('should return 404 for non-existent share', async () => {
      const response = await request(app)
        .get('/api/share/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('not found');
    });

    test('should return empty files array for share with no files', async () => {
      const share = await Share.create();

      const response = await request(app)
        .get(`/api/share/${share.shareId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.files).toHaveLength(0);
    });

    test('should return multiple files for share', async () => {
      const share = await Share.create();
      
      await File.create({
        shareId: share.shareId,
        originalName: 'file1.pdf',
        storedName: 'uuid-file1.pdf',
        mimeType: 'application/pdf',
        size: 1024
      });

      await File.create({
        shareId: share.shareId,
        originalName: 'file2.jpg',
        storedName: 'uuid-file2.jpg',
        mimeType: 'image/jpeg',
        size: 2048
      });

      const response = await request(app)
        .get(`/api/share/${share.shareId}`)
        .expect(200);

      expect(response.body.files).toHaveLength(2);
    });
  });
});
