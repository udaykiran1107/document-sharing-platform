import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home Page', () => {
  test('renders main heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/share documents instantly/i)).toBeInTheDocument();
  });

  test('renders upload component', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/choose files/i)).toBeInTheDocument();
  });

  test('displays how it works section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
    expect(screen.getByText(/upload files/i)).toBeInTheDocument();
    expect(screen.getByText(/get link/i)).toBeInTheDocument();
    expect(screen.getByText(/share/i)).toBeInTheDocument();
  });

  test('displays features section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/features/i)).toBeInTheDocument();
    expect(screen.getByText(/no registration/i)).toBeInTheDocument();
    expect(screen.getByText(/multiple files/i)).toBeInTheDocument();
  });
});
