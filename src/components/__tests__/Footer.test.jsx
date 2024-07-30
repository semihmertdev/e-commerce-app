import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  });

  test('renders newsletter section with title and form', () => {
    expect(screen.getByText(/newsletter signup/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  test('renders company links', () => {
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(screen.getByText(/privacy policy/i)).toBeInTheDocument();
    expect(screen.getByText(/terms of service/i)).toBeInTheDocument();
    expect(screen.getByText(/faqs/i)).toBeInTheDocument();
  });

  test('renders contact information', () => {
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
    expect(screen.getByText(/support@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 234 567 890/i)).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    expect(screen.getByLabelText(/facebook/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instagram/i)).toBeInTheDocument();
  });

  test('renders payment icons', () => {
    expect(screen.getByLabelText(/visa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mastercard/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/paypal/i)).toBeInTheDocument();
  });

  test('renders footer bottom text', () => {
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Semih Mert. All rights reserved.`)).toBeInTheDocument();
  });
});
