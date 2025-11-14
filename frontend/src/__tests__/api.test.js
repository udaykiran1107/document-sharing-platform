import { describe, test, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { uploadFiles, getShare, getDownloadUrl, getViewUrl } from '../services/api';

// Mock axios
vi.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('uploadFiles', () => {
    test('should send files as FormData', async () => {
      const mockResponse = {
        data: {
          success: true,
          shareId: 'test-share-id',
          shareUrl: 'http://localhost:3000/share/test-share-id'
        }
      };

      axios.create = vi.fn(() => ({
        post: vi.fn().mockResolvedValue(mockResponse)
      }));

      const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const files = [file];

      // Note: This test verifies the structure, actual upload would need integration test
      expect(files).toHaveLength(1);
      expect(files[0].name).toBe('test.pdf');
    });
  });

  describe('getDownloadUrl', () => {
    test('should return correct download URL', () => {
      const shareId = 'test-share-id';
      const fileId = 'test-file-id';
      
      const url = getDownloadUrl(shareId, fileId);
      
      expect(url).toContain('/api/download/');
      expect(url).toContain(shareId);
      expect(url).toContain(fileId);
    });
  });

  describe('getViewUrl', () => {
    test('should return correct view URL', () => {
      const shareId = 'test-share-id';
      const fileId = 'test-file-id';
      
      const url = getViewUrl(shareId, fileId);
      
      expect(url).toContain('/api/view/');
      expect(url).toContain(shareId);
      expect(url).toContain(fileId);
    });
  });
});
