import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ProductCard from '../ProductCard';
import { useFavorites } from '../../hooks/useFavorites';

// Mock the useFavorites hook
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: vi.fn(),
}));

const mockNavigate = vi.fn();

// Update the react-router-dom mock
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ProductCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const product = {
    id: '1',
    title: 'Test Product',
    description: 'This is a test product',
    price: '19.99',
    image: 'http://placekitten.com/200/200',
  };

  it('renders product information correctly', () => {
    useFavorites.mockReturnValue({
      favorites: [],
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
    });

    render(<ProductCard product={product} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', product.image);
  });

  it('navigates to product details page on card click', () => {
    useFavorites.mockReturnValue({
      favorites: [],
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
    });

    render(<ProductCard product={product} />);

    fireEvent.click(screen.getByAltText('Test Product'));
    expect(mockNavigate).toHaveBeenCalledWith(`/product/${product.id}`);
  });

  it('toggles favorite status on favorite button click', () => {
    const addToFavorites = vi.fn();
    const removeFromFavorites = vi.fn();

    // First render: product is a favorite
    useFavorites.mockReturnValue({
      favorites: [{ id: '1' }],
      addToFavorites,
      removeFromFavorites,
    });

    const { rerender } = render(<ProductCard product={product} />);

    const favoriteButtons = screen.getAllByTestId('favorite-button');
    expect(favoriteButtons[0]).toBeInTheDocument();

    fireEvent.click(favoriteButtons[0]);
    expect(removeFromFavorites).toHaveBeenCalledWith(product);
    
    // Second render: product is not a favorite
    useFavorites.mockReturnValue({
      favorites: [],
      addToFavorites,
      removeFromFavorites,
    });

    rerender(<ProductCard product={product} />);

    const updatedFavoriteButtons = screen.getAllByTestId('favorite-button');
    fireEvent.click(updatedFavoriteButtons[0]);
    expect(addToFavorites).toHaveBeenCalledWith(product);
  });
});