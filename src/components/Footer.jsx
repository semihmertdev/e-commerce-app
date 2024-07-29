// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 2rem 1rem;
  text-align: center;
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialMediaIcons = styled.div`
  margin: 1rem 0;

  a {
    color: #fff;
    margin: 0 0.5rem;
    font-size: 1.5rem;

    &:hover {
      color: #ccc;
    }
  }
`;

const NewsletterForm = styled.form`
  margin: 1rem 0;

  input[type="email"] {
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    margin-right: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const PaymentIcons = styled.div`
  margin: 1rem 0;

  img {
    width: 40px;
    margin: 0 0.5rem;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterSection>
      <FooterTitle>Company</FooterTitle>
      <FooterLink to="/about">About Us</FooterLink>
      <FooterLink to="/privacy">Privacy Policy</FooterLink>
      <FooterLink to="/terms">Terms of Service</FooterLink>
      <FooterLink to="/faq">FAQs</FooterLink>
    </FooterSection>
    
    <FooterSection>
      <FooterTitle>Contact Us</FooterTitle>
      <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
      <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Follow Us</FooterTitle>
      <SocialMediaIcons>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">F</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">T</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">I</a>
      </SocialMediaIcons>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Newsletter Signup</FooterTitle>
      <NewsletterForm>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </NewsletterForm>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Payment Methods</FooterTitle>
      <PaymentIcons>
        <img src="/images/visa.png" alt="Visa" />
        <img src="/images/mastercard.png" alt="MasterCard" />
        <img src="/images/paypal.png" alt="PayPal" />
      </PaymentIcons>
    </FooterSection>

    <FooterSection>
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </FooterSection>
  </FooterContainer>
);

export default Footer;
