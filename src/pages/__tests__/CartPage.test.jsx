import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartPage from '../CartPage';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

vi.mock('../../hooks/useCart');
vi.mock('../../hooks/useFavorites');

describe('CartPage', () => {
  const mockCart = [
    { id: 1, title: 'Test Product', price: 10, quantity: 2, size: 'M', color: 'red', image: 'test.jpg' }
  ];

  beforeEach(() => {
    useCart.mockReturnValue({
      cart: mockCart,
      updateCartQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      clearCart: vi.fn()
    });
    useFavorites.mockReturnValue({
      addToFavorites: vi.fn()
    });
  });

  it('renders cart items correctly', () => {
    render(<CartPage />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $10')).toBeInTheDocument();
    expect(screen.getByText('Size: M')).toBeInTheDocument();
  });

  it('calculates total amount correctly', () => {
    render(<CartPage />);
    expect(screen.getByText('Total: $20.00')).toBeInTheDocument();
  });

  it('calls updateCartQuantity when quantity is changed', () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('+'));
    expect(useCart().updateCartQuantity).toHaveBeenCalledWith(1, 'M', 'red', 3);
  });

  it('opens confirm modal when remove button is clicked', () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('Remove'));
    expect(screen.getByText('Are you sure you want to remove this item from the cart?')).toBeInTheDocument();
  });

  it('calls removeFromCart when removal is confirmed', () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('Remove'));
    fireEvent.click(screen.getByText('Yes, Remove'));
    expect(useCart().removeFromCart).toHaveBeenCalledWith(1, 'M', 'red');
  });

  it('opens empty cart modal when trying to complete order with empty cart', () => {
    useCart.mockReturnValue({
      ...useCart(),
      cart: []
    });
    render(<CartPage />);
    fireEvent.click(screen.getByText('Complete Order'));
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('clears cart and opens order complete modal when order is completed', () => {
    render(<CartPage />);
    fireEvent.click(screen.getByText('Complete Order'));
    expect(useCart().clearCart).toHaveBeenCalled();
    expect(screen.getByText('Order Completed')).toBeInTheDocument();
  });
});