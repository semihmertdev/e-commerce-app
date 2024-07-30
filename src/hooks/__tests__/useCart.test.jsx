// src/components/CartProvider.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart } from '../useCart';

const TestComponent = () => {
  const { cart, addToCart, updateCartQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div>
      <button onClick={() => addToCart({ id: 1, title: 'Product 1', image: 'image1', price: 100 }, 2, 'M', 'red')}>
        Add Product
      </button>
      <button onClick={() => updateCartQuantity(1, 'M', 'red', 5)}>Update Quantity</button>
      <button onClick={() => removeFromCart(1, 'M', 'red')}>Remove Product</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
      <div>{JSON.stringify(cart)}</div>
    </div>
  );
};

describe('CartProvider', () => {
  it('adds product to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    expect(screen.getByText(/"quantity":2/)).toBeInTheDocument();
  });

  it('updates product quantity in cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Update Quantity'));
    expect(screen.getByText(/"quantity":5/)).toBeInTheDocument();
  });

  it('removes product from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Remove Product'));
    expect(screen.queryByText(/"quantity":2/)).not.toBeInTheDocument();
  });

  it('clears the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add Product'));
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.queryByText(/"quantity":2/)).not.toBeInTheDocument();
  });
});
