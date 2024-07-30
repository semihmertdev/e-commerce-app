import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  opacity: ${props => (props.active ? '1' : '0')};
  z-index: ${props => (props.active ? '1' : '0')};
`;

const CTAButton = styled(Link)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  border: 3px solid black;
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
    background-color: black;
    color: white;
    border: 3px solid white;
  }

  &:active {
    transform: translateX(-50%) translateY(1px);
}
`;

const Section = styled.section`
  padding: 2rem 1rem;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const FeaturedProducts = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 150px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  color: #333;
`;

const DiscountSection = styled(Section)`
  background-color: #f4f4f4;
`;

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [randomOffers, setRandomOffers] = useState([]);

  const images = [
    'https://img.freepik.com/free-photo/young-handsome-man-choosing-clothes-shop_1303-19722.jpg?t=st=1722302049~exp=1722305649~hmac=0eb2adf10026e52f378ae212ac7ec7caae0aa94c4c178be23fb4df4c8f156a85&w=1380',
    'https://img.freepik.com/free-photo/top-view-smartphone-with-keyboard-charger_23-2149404179.jpg?t=st=1722302108~exp=1722305708~hmac=eca0e44b37999ad30091fce87e563d96773c1879755786bdb0599d769a25afc9&w=1380',
    'https://img.freepik.com/free-photo/model-demonstrating-earrings-ring_7502-7042.jpg?t=st=1722302145~exp=1722305745~hmac=b6d183ec69080378948058fb49a7e7ed6297791a5fcc8f1542b44b217b9a31fb&w=1380'
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
            active={index === currentSlide}
          />
        ))}
        <CTAButton to="/shop">Shop Now</CTAButton>
      </HeroSection>

      <Section>
        <Title>Featured Products</Title>
        <FeaturedProducts>
          {products.slice(0, 3).map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard>
                <ProductImage src={product.image} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
              </ProductCard>
            </Link>
          ))}
        </FeaturedProducts>
      </Section>

      <DiscountSection>
        <Title>Discounted Products</Title>
        <FeaturedProducts>
          {discountedProducts.slice(0, 3).map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard>
                <ProductImage src={product.image} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.discountedPrice.toFixed(2)}</ProductPrice>
              </ProductCard>
            </Link>
          ))}
        </FeaturedProducts>
      </DiscountSection>

      <Section>
        <Title>Special Offers</Title>
        <FeaturedProducts>
          {randomOffers.map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard>
                <ProductImage src={product.image} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>${product.price}</ProductPrice>
              </ProductCard>
            </Link>
          ))}
        </FeaturedProducts>
      </Section>
    </div>
  );
};

export default HomePage;




