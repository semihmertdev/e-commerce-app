import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ShopPage from '../ShopPage';
import { useFavorites } from '../../hooks/useFavorites';

// Mock the useFavorites hook
vi.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    addToFavorites: vi.fn(),
    removeFromFavorites: vi.fn(),
  }),
}));

test('renders product cards', async () => {
  // Mock the fetch API
  vi.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve([
      { id: 1, title: 'Product 1', category: 'category1' },
      { id: 2, title: 'Product 2', category: 'category2' },
    ]),
  });

  render(<ShopPage />, { wrapper: MemoryRouter });

  // Wait for the products to be fetched and rendered
  await waitFor(() => screen.getByText('Product 1'));

  // Assert that the product cards are rendered
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Product 2')).toBeInTheDocument();
});

test('filters products by category', async () => {
  // Mock the fetch API
  vi.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve([
      { id: 1, title: 'Product 1', category: 'category1' },
      { id: 2, title: 'Product 2', category: 'category2' },
    ]),
  });

  render(<ShopPage />, { wrapper: MemoryRouter });

  // Wait for the products to be fetched and rendered
  await waitFor(() => screen.getByText('Product 1'));

  // Act on the filter button click
  await act(async () => {
    screen.getByText('category2').click();
  });

  // Assert that only the products in the 'category2' category are displayed
  expect(screen.getByText('Product 2')).toBeInTheDocument();
  expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
});

test('displays a message when no products are found', async () => {
  // Mock the fetch API to return an empty array
  vi.spyOn(global, 'fetch').mockResolvedValue({
    json: () => Promise.resolve([]),
  });

  render(<ShopPage />, { wrapper: MemoryRouter });

  // Wait for the message to be displayed
  await waitFor(() => screen.getByText('No products found matching your search.'));

  expect(screen.getByText('No products found matching your search.')).toBeInTheDocument();
});