import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Upload from '../components/Upload';

// Mock the API
vi.mock('../services/api', () => ({
  uploadFiles: vi.fn()
}));

describe('Upload Component', () => {
  test('renders upload interface', () => {
    render(<Upload />);
    
    expect(screen.getByText(/choose files/i)).toBeInTheDocument();
    expect(screen.getByText(/drag and drop/i)).toBeInTheDocument();
  });

  test('displays file size limit information', () => {
    render(<Upload />);
    
    expect(screen.getByText(/max 50MB/i)).toBeInTheDocument();
  });

  test('displays supported file types', () => {
    render(<Upload />);
    
    const text = screen.getByText(/PDF, images, text files, Office documents/i);
    expect(text).toBeInTheDocument();
  });

  test('shows upload button when files are selected', () => {
    render(<Upload />);
    
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = document.querySelector('input[type="file"]');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText(/upload files/i)).toBeInTheDocument();
  });
});
