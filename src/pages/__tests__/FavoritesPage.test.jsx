import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import FavoritesPage from '../FavoritesPage';
import { useFavorites } from '../../hooks/useFavorites';
import ProductCard from '../../components/ProductCard';

// Mock ProductCard component
vi.mock('../../components/ProductCard', () => ({
  default: ({ product }) => (
    <div data-testid="product-card">
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  )
}));

// Mock useFavorites hook
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [
      { id: 1, title: 'Product 1', description: 'Description 1', price: '10.00', image: '' },
      { id: 2, title: 'Product 2', description: 'Description 2', price: '20.00', image: '' }
    ],
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn()
  })
}));

describe('FavoritesPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders ProductCard components when favorites are present', () => {
    render(<FavoritesPage />);

    expect(screen.getByText('Your Favorites')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });
});
