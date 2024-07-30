// src/components/EmptyCartModal.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EmptyCartModal from '../EmptyCartModal';

describe('EmptyCartModal', () => {
  it('renders correctly when open', () => {
    render(<EmptyCartModal isOpen={true} onRequestClose={() => {}} />);
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Add items to the cart before completing the order.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<EmptyCartModal isOpen={false} onRequestClose={() => {}} />);
    
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();
    expect(screen.queryByText('Add items to the cart before completing the order.')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('calls onRequestClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<EmptyCartModal isOpen={true} onRequestClose={handleClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
