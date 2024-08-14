import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; 

// Styled components
const HeroSection = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  margin: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Slide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  transition: opacity 1s ease-in-out;
  opacity: ${props => (props.active === 'true' ? '1' : '0')};
  z-index: ${props => (props.active === 'true' ? '1' : '0')};
`;

const CTAButton = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #FCC730; /* Updated color */
  color: white; /* Updated color */
  border: 3px solid white; /* Updated color */
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: background-color 0.3s ease;
  z-index: 2; /* Ensure it appears above slides */

  &:hover {
    background-color: white; /* Updated color */
    color: #FCC730; /* Updated color */
    border: 3px solid #FCC730; /* Updated color */
  }

  &:active {
    transform: translateX(-50%) translateY(1px);
  }
`;

const Section = styled.section`
  padding: 2rem 1rem;
  text-align: center;
  background-color: white; /* Updated color */
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #FCC730; /* Updated color */
`;

const FeaturedProducts = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  background-color: white; /* Updated color */
`;

const DiscountSection = styled(Section)`
  background-color: white; /* Updated color */
`;

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [randomOffers, setRandomOffers] = useState([]);

  const images = [
    'https://c1.wallpaperflare.com/path/573/909/315/store-clothes-clothing-line-ccf59ee3d9dbe3d954b258c699e94963.jpg',
    'https://c0.wallpaperflare.com/path/431/631/578/mouse-hardware-computer-electronics-441c0ed626d94da0dc05c9199af7387c.jpg',
    'https://c1.wallpaperflare.com/path/500/166/557/jewelry-pendant-necklace-jewellery-8110e9aa10faa4fe351400c59f978bc7.jpg'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);

        // Example logic for filtering discounted products
        const discounted = data.map(product => ({
          ...product,
          discountedPrice: product.price * 0.8 // Simulating a 20% discount
        }));
        setDiscountedProducts(randomizeArray(discounted));

        // Example logic for getting random offers
        setRandomOffers(randomizeArray(data).slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [images.length]);

  const randomizeArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div>
      <HeroSection>
        {images.map((image, index) => (
          <Slide
            key={index}
            image={image}
            active={index === currentSlide ? 'true' : 'false'}
          />
        ))}
        <CTAButton to="/shop">Shop Now</CTAButton>
      </HeroSection>

      <Section>
        <Title>Featured Products</Title>
        <FeaturedProducts>
          {products.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </FeaturedProducts>
      </Section>

      <DiscountSection>
        <Title>Discounted Products</Title>
        <FeaturedProducts>
          {discountedProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </FeaturedProducts>
      </DiscountSection>

      <Section>
        <Title>Special Offers</Title>
        <FeaturedProducts>
          {randomOffers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </FeaturedProducts>
      </Section>
    </div>
  );
};

export default HomePage;
