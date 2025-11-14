import { Share } from '../models/Share.js';
import { File } from '../models/File.js';
import { initializeDatabase } from '../database/db.js';
import fs from 'fs';

// Use test database
process.env.DATABASE_PATH = './data/test-database.sqlite';

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(() => {
  // Clean up test database
  if (fs.existsSync('./data/test-database.sqlite')) {
    fs.unlinkSync('./data/test-database.sqlite');
  }
});

describe('Share Model', () => {
  test('should create a new share with UUID', async () => {
    const share = await Share.create();
    
    expect(share).toBeDefined();
    expect(share.id).toBeDefined();
    expect(share.shareId).toBeDefined();
    expect(share.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    expect(share.shareId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  });

  test('should find share by shareId', async () => {
    const createdShare = await Share.create();
    const foundShare = await Share.findByShareId(createdShare.shareId);
    
    expect(foundShare).toBeDefined();
    expect(foundShare.shareId).toBe(createdShare.shareId);
  });

  test('should return null for non-existent shareId', async () => {
    const share = await Share.findByShareId('non-existent-id');
    expect(share).toBeNull();
  });
});

describe('File Model', () => {
  let testShare;

  beforeEach(async () => {
    testShare = await Share.create();
  });

  test('should create a new file record', async () => {
    const fileData = {
      shareId: testShare.shareId,
      originalName: 'test.pdf',
      storedName: 'uuid-test.pdf',
      mimeType: 'application/pdf',
      size: 1024000
    };

    const file = await File.create(fileData);
    
    expect(file).toBeDefined();
    expect(file.id).toBeDefined();
    expect(file.shareId).toBe(testShare.shareId);
    expect(file.originalName).toBe('test.pdf');
    expect(file.size).toBe(1024000);
  });

  test('should find files by shareId', async () => {
    const fileData1 = {
      shareId: testShare.shareId,
      originalName: 'file1.pdf',
      storedName: 'uuid-file1.pdf',
      mimeType: 'application/pdf',
      size: 1024
    };

    const fileData2 = {
      shareId: testShare.shareId,
      originalName: 'file2.jpg',
      storedName: 'uuid-file2.jpg',
      mimeType: 'image/jpeg',
      size: 2048
    };

    await File.create(fileData1);
    await File.create(fileData2);

    const files = await File.findByShareId(testShare.shareId);
    
    expect(files).toHaveLength(2);
    expect(files[0].originalName).toBe('file1.pdf');
    expect(files[1].originalName).toBe('file2.jpg');
  });

  test('should find file by ID', async () => {
    const fileData = {
      shareId: testShare.shareId,
      originalName: 'test.pdf',
      storedName: 'uuid-test.pdf',
      mimeType: 'application/pdf',
      size: 1024
    };

    const createdFile = await File.create(fileData);
    const foundFile = await File.findById(createdFile.id);
    
    expect(foundFile).toBeDefined();
    expect(foundFile.id).toBe(createdFile.id);
    expect(foundFile.originalName).toBe('test.pdf');
  });
});
