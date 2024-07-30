// src/pages/__tests__/ProductDetails.test.jsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, it, beforeEach, afterEach, vi } from 'vitest';
import ProductDetails from '../ProductDetails';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { toast } from 'react-toastify';

// Mock hooks
vi.mock('../../hooks/useCart');
vi.mock('../../hooks/useFavorites');
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
}));

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  description: 'Test Description',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/test.jpg',
};

const renderComponent = (id) => {
  render(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProductDetails', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProduct),
      })
    );
    useCart.mockReturnValue({
      addToCart: vi.fn(),
    });
    useFavorites.mockReturnValue({
      favorites: [],
      addToFavorites: vi.fn(),
      removeFromFavorites: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders product details', async () => {
    renderComponent(1);

    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
  });

  it('toggles favorite status', async () => {
    renderComponent(1);

    const favoriteButton = await screen.findByText('🤍');
    fireEvent.click(favoriteButton);

    await waitFor(() => expect(useFavorites().addToFavorites).toHaveBeenCalledWith(mockProduct));
  });

  it('shows modal if required options are not selected', async () => {
    renderComponent(1);

    fireEvent.click(await screen.findByText('Add to Cart'));

    expect(await screen.findByText('Please select all required options before adding to cart.')).toBeInTheDocument();
  });
});
