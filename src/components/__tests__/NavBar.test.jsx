// src/components/__tests__/NavBar.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import { useCart } from '../../hooks/useCart';

// Mock the useCart hook
vi.mock('../../hooks/useCart', () => ({
  useCart: vi.fn()
}));

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NavBar', () => {
  beforeEach(() => {
    useCart.mockReturnValue({ cart: [1, 2, 3] }); // Mock cart with 3 items
    vi.clearAllMocks(); // Clear all mocks before each test
  });

  it('renders correctly', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText('E-comm')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('Cart (3)')).toBeInTheDocument();
  });

  it('updates search term and navigates on search submit', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.submit(searchInput);

    expect(mockNavigate).toHaveBeenCalledWith('/shop?search=test%20search');
  });

  it('does not navigate on empty search', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.submit(searchInput);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to correct routes on link clicks', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('E-comm');
    const shopLink = screen.getByText('Shop');
    const loginLink = screen.getByText('Log In');
    const favoritesLink = screen.getByText('Favorites');
    const cartLink = screen.getByText('Cart (3)');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(shopLink).toHaveAttribute('href', '/shop');
    expect(loginLink).toHaveAttribute('href', '/');
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
    expect(cartLink).toHaveAttribute('href', '/cart');
  });
});