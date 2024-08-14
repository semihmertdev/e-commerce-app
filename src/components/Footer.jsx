import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';

// Styled components
const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
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
  background-color: #333;
  padding: 1rem;
  border-radius: 8px;
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
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #FCC730;
  display: inline-block;
  padding-bottom: 0.5rem;
  text-transform: uppercase;
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-transform: capitalize;
  display: block;
  margin: 0.5rem 0;
  font-weight: 500;

  &:hover {
    color: #FCC730;
    text-decoration: underline;
  }
`;

const ExternalLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #FCC730;
    text-decoration: underline;
  }
`;

const SocialMediaIcons = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 0.75rem;

  a {
    color: #fff;
    font-size: 2rem;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: #FCC730;
      transform: scale(1.1);
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
    border: 1px solid #FCC730;
    background-color: #fff;
    color: #333;
    box-sizing: border-box;
  }

  button {
    padding: 0.75rem 1rem;
    background-color: #FCC730;
    border: 2px solid #FCC730;
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    font-weight: 600;
    white-space: nowrap;
    box-sizing: border-box;

    &:hover {
      background-color: #fff;
      color: #FCC730;
      border-color: #FCC730;
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
    color: #fff;
    transition: color 0.3s;

    &:hover {
      color: #FCC730;
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
  background-color: #222;
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
