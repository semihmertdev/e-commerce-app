// src/components/Categories.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Categories from '../Categories';

describe('Categories', () => {
  const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];
  const handleCategoryClick = vi.fn();

  it('renders correctly', () => {
    render(<Categories categories={categories} onCategoryClick={handleCategoryClick} />);

    // Check if the "All" button is rendered
    expect(screen.getByText('All')).toBeInTheDocument();

    // Check if all category buttons are rendered
    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('calls onCategoryClick with null when "All" button is clicked', () => {
    render(<Categories categories={categories} onCategoryClick={handleCategoryClick} />);

    fireEvent.click(screen.getByText('All'));
    expect(handleCategoryClick).toHaveBeenCalledWith(null);
  });

  it('calls onCategoryClick with the correct category when a category button is clicked', () => {
    render(<Categories categories={categories} onCategoryClick={handleCategoryClick} />);

    categories.forEach((category) => {
      fireEvent.click(screen.getByText(category));
      expect(handleCategoryClick).toHaveBeenCalledWith(category);
    });
  });
});
