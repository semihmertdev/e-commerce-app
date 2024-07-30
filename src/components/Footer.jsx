import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

// Styled components
const FooterContainer = styled.footer`
  background-color: #333;
  color: #f0f0f0;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 0.9rem;
  position: relative;
  overflow: hidden;
`;

const NewsletterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const FooterSectionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  margin: 1rem;
`;

const FooterTitle = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  border-bottom: 2px solid #ff5722;
  display: inline-block;
  padding-bottom: 0.5rem;
  text-transform: uppercase;
`;

const FooterLink = styled(Link)`
  color: #f0f0f0;
  text-decoration: none;
  text-transform: capitalize;
  display: block;
  margin: 0.5rem 0;
  font-weight: 500;

  &:hover {
    color: #ff5722;
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  color: #f0f0f0;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #ff5722;
    text-decoration: none;
  }
`;

const SocialMediaIcons = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.75rem;

  a {
    color: #f0f0f0;
    font-size: 2rem;
    transition: color 0.3s;

    &:hover {
      color: #ff5722;
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 100%;
  margin: 1rem 0;

  input[type="email"] {
    flex: 1;
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ff5722;
    background-color: #fff;
    color: #333;
    box-sizing: border-box;
  }

  button {
    padding: 0.75rem 1rem;
    background-color: #ff5722;
    border: 3px solid #ff5722;
    color: #fff;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    font-weight: 600;
    white-space: nowrap;
    box-sizing: border-box;

    &:hover {
      background-color: #fff;
      color: #ff5722;
      border-color: #ff5722;
    }
  }
`;

const PaymentIcons = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.75rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: #f0f0f0;
    transition: color 0.3s;

    &:hover {
      color: #ff5722;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.8rem;
  color: #888;
  margin-top: 2rem;
  padding: 1rem 0;
  background-color: #333;
  position: relative;
  z-index: 1;
`;

const Footer = () => (
  <FooterContainer>
    <NewsletterSection>
      <FooterTitle>Newsletter Signup</FooterTitle>
      <NewsletterForm>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </NewsletterForm>
    </NewsletterSection>

    <FooterSectionsWrapper>
      <FooterSection>
        <FooterTitle>Company</FooterTitle>
        <FooterLink to="/about">About Us</FooterLink>
        <FooterLink to="/privacy">Privacy Policy</FooterLink>
        <FooterLink to="/terms">Terms of Service</FooterLink>
        <FooterLink to="/faq">FAQs</FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Contact Us</FooterTitle>
        <p>Email: <ExternalLink href="mailto:support@example.com">support@example.com</ExternalLink></p>
        <p>Phone: <ExternalLink href="tel:+1234567890">+1 234 567 890</ExternalLink></p>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Follow Us</FooterTitle>
        <SocialMediaIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </SocialMediaIcons>
      </FooterSection>

      <FooterSection>
        <FooterTitle>Payment Methods</FooterTitle>
        <PaymentIcons>
          <SiVisa aria-label="Visa" />
          <SiMastercard aria-label="Mastercard" />
          <SiPaypal aria-label="Paypal" />
        </PaymentIcons>
      </FooterSection>
    </FooterSectionsWrapper>

    <FooterBottom>
      <p>&copy; {new Date().getFullYear()} Semih Mert. All rights reserved.</p>
    </FooterBottom>
  </FooterContainer>
);

export default Footer;
  