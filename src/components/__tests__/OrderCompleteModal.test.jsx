// src/components/__tests__/OrderCompleteModal.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrderCompleteModal from '../OrderCompleteModal';

describe('OrderCompleteModal', () => {
  it('renders correctly when open', () => {
    render(<OrderCompleteModal isOpen={true} onRequestClose={() => {}} />);

    expect(screen.getByText('Order Completed')).toBeInTheDocument();
    expect(screen.getByText('Your order has been successfully completed. Thank you for shopping with us!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<OrderCompleteModal isOpen={false} onRequestClose={() => {}} />);

    expect(screen.queryByText('Order Completed')).not.toBeInTheDocument();
  });

  it('calls onRequestClose when Close button is clicked', () => {
    const mockOnRequestClose = vi.fn();
    render(<OrderCompleteModal isOpen={true} onRequestClose={mockOnRequestClose} />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
  });
});