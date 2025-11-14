import { config } from '../config/config.js';

describe('File Validation Logic', () => {
  describe('File Size Validation', () => {
    test('should accept files under 50MB', () => {
      const fileSize = 10 * 1024 * 1024; // 10MB
      expect(fileSize).toBeLessThanOrEqual(config.maxFileSize);
    });

    test('should reject files over 50MB', () => {
      const fileSize = 60 * 1024 * 1024; // 60MB
      expect(fileSize).toBeGreaterThan(config.maxFileSize);
    });

    test('maxFileSize should be 50MB', () => {
      expect(config.maxFileSize).toBe(52428800);
    });
  });

  describe('MIME Type Validation', () => {
    test('should accept PDF files', () => {
      expect(config.supportedMimeTypes).toContain('application/pdf');
    });

    test('should accept JPEG images', () => {
      expect(config.supportedMimeTypes).toContain('image/jpeg');
    });

    test('should accept PNG images', () => {
      expect(config.supportedMimeTypes).toContain('image/png');
    });

    test('should accept text files', () => {
      expect(config.supportedMimeTypes).toContain('text/plain');
    });

    test('should accept DOCX files', () => {
      expect(config.supportedMimeTypes).toContain(
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
    });

    test('should not accept unsupported types', () => {
      expect(config.supportedMimeTypes).not.toContain('application/zip');
      expect(config.supportedMimeTypes).not.toContain('application/x-executable');
    });
  });
});
