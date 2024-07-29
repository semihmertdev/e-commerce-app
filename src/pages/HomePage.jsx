import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const HeroSection = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
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
`;

const SlideControls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`;

const ArrowButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${props => (props.active === 'true' ? '#007bff' : '#ccc')};
  border-radius: 50%;
  cursor: pointer;
`;

const Section = styled.section`
  padding: 2rem 1rem;
  text-align: center;
`;

const FeaturedProducts = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem 1rem;
`;

const Category = styled.div`
  text-align: center;
  width: 150px;
`;

const CategoryImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg'
  ];

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <HeroSection>
        {images.map((image, index) => (
          <Slide key={index} image={image} active={index === currentSlide ? 'true' : 'false'} />
        ))}
        <SlideControls>
          <ArrowButton onClick={prevSlide}>&lt;</ArrowButton>
          <ArrowButton onClick={nextSlide}>&gt;</ArrowButton>
        </SlideControls>
        <IndicatorContainer>
          {images.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentSlide ? 'true' : 'false'}
              onClick={() => goToSlide(index)}
            />
          ))}
        </IndicatorContainer>
      </HeroSection>

      <Section>
        <h2>Featured Products</h2>
        <FeaturedProducts>
          <ProductCard>
            <img src="/path/to/product1.jpg" alt="Product 1" />
            <h3>Product 1</h3>
            <p>$19.99</p>
          </ProductCard>
          <ProductCard>
            <img src="/path/to/product2.jpg" alt="Product 2" />
            <h3>Product 2</h3>
            <p>$29.99</p>
          </ProductCard>
          {/* Add more ProductCards as needed */}
        </FeaturedProducts>
      </Section>

      <Section>
        <h2>Categories</h2>
        <CategorySection>
          <Category>
            <CategoryImage src="/path/to/category1.jpg" alt="Category 1" />
            <h3>Category 1</h3>
          </Category>
          <Category>
            <CategoryImage src="/path/to/category2.jpg" alt="Category 2" />
            <h3>Category 2</h3>
          </Category>
          {/* Add more Categories as needed */}
        </CategorySection>
      </Section>

      <Section>
        <h2>Special Offers</h2>
        <p>Check out our latest deals and discounts!</p>
        {/* Add promotional banners or offers here */}
      </Section>

      <Section>
        <h2>Subscribe to Our Newsletter</h2>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </Section>
    </div>
  );
}

export default HomePage;
