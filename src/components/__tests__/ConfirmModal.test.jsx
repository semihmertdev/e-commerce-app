// src/components/ConfirmModal.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ConfirmModal from '../ConfirmModal';

describe('ConfirmModal', () => {
  const item = {
    title: 'Sample Item',
    size: 'L',
    color: '#ff0000'
  };

  it('renders correctly when open', () => {
    render(
      <ConfirmModal 
        isOpen={true} 
        onRequestClose={() => {}} 
        onConfirm={() => {}} 
        onConfirmAndAddToFavorites={() => {}} 
        item={item} 
      />
    );

    expect(screen.getByText('Are you sure you want to remove this item from the cart?')).toBeInTheDocument();
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(`Size: ${item.size}`)).toBeInTheDocument();
    expect(screen.getByText('Yes, Remove')).toBeInTheDocument();
    expect(screen.getByText('Yes and Add to Favorites')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <ConfirmModal 
        isOpen={false} 
        onRequestClose={() => {}} 
        onConfirm={() => {}} 
        onConfirmAndAddToFavorites={() => {}} 
        item={item} 
      />
    );

    expect(screen.queryByText('Are you sure you want to remove this item from the cart?')).not.toBeInTheDocument();
  });

  it('calls onConfirm when "Yes, Remove" button is clicked', () => {
    const handleConfirm = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        onRequestClose={() => {}} 
        onConfirm={handleConfirm} 
        onConfirmAndAddToFavorites={() => {}} 
        item={item} 
      />
    );

    fireEvent.click(screen.getByText('Yes, Remove'));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirmAndAddToFavorites when "Yes and Add to Favorites" button is clicked', () => {
    const handleConfirmAndAddToFavorites = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        onRequestClose={() => {}} 
        onConfirm={() => {}} 
        onConfirmAndAddToFavorites={handleConfirmAndAddToFavorites} 
        item={item} 
      />
    );

    fireEvent.click(screen.getByText('Yes and Add to Favorites'));
    expect(handleConfirmAndAddToFavorites).toHaveBeenCalledTimes(1);
  });

  it('calls onRequestClose when "Cancel" button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <ConfirmModal 
        isOpen={true} 
        onRequestClose={handleClose} 
        onConfirm={() => {}} 
        onConfirmAndAddToFavorites={() => {}} 
        item={item} 
      />
    );

    fireEvent.click(screen.getByText('Cancel'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
