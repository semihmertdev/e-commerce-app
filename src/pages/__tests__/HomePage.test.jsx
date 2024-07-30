import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { FavoritesProvider } from '../../hooks/useFavorites'; // Favoriler sağlayıcısını içeri aktar

describe('HomePage', () => {
  beforeEach(() => {
    // Mock fetch response
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          {
            id: 1,
            title: 'Product 1',
            price: 100,
            image: 'https://via.placeholder.com/150',
          },
          {
            id: 2,
            title: 'Product 2',
            price: 200,
            image: 'https://via.placeholder.com/150',
          },
          // Add more products as needed for tests
        ]),
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui) => {
    return render(
      <BrowserRouter>
        <FavoritesProvider>
          {ui}
        </FavoritesProvider>
      </BrowserRouter>
    );
  };

  test('renders hero section with CTA button', async () => {
    renderWithProviders(<HomePage />);

    const ctaButton = screen.getByText(/Shop Now/i);
    expect(ctaButton).toBeInTheDocument();
  });

  test('renders featured products', async () => {
    renderWithProviders(<HomePage />);

    // Wait for the products to be fetched and rendered
    await waitFor(() => {
      const productCards = screen.getAllByRole('img');
      expect(productCards.length).toBeGreaterThan(0);
    });
  });

  test('renders discounted products', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      const discountTitle = screen.getByText(/Discounted Products/i);
      expect(discountTitle).toBeInTheDocument();
    });
  });

  test('renders special offers', async () => {
    renderWithProviders(<HomePage />);

    await waitFor(() => {
      const offersTitle = screen.getByText(/Special Offers/i);
      expect(offersTitle).toBeInTheDocument();
    });
  });
});
