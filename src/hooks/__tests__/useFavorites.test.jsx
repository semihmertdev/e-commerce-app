// src/components/FavoritesProvider.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FavoritesProvider, useFavorites } from '../useFavorites';

const TestComponent = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  return (
    <div>
      <button
        onClick={() =>
          addToFavorites({ id: 1, title: 'Product 1', image: 'image1', price: 100 })
        }
      >
        Add Product
      </button>
      <button
        onClick={() =>
          removeFromFavorites({ id: 1, title: 'Product 1', image: 'image1', price: 100 })
        }
      >
        Remove Product
      </button>
      <div>{JSON.stringify(favorites)}</div>
    </div>
  );
};

describe('FavoritesProvider', () => {
  it('adds product to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByText(/"title":"Product 1"/)).toBeInTheDocument();
  });

  it('removes product from favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Remove Product'));
    expect(screen.queryByText(/"title":"Product 1"/)).not.toBeInTheDocument();
  });

  it('does not add duplicate products to favorites', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Add Product'));
    // There should still be only one instance of the product in favorites
    expect(screen.getAllByText(/"title":"Product 1"/)).toHaveLength(1);
  });
});
