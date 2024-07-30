import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const HeroSection = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
  margin: 2rem;
`;

const Slide = styled.div`
  position: absolute;
  width: 60%; /* Set width to 60% of the screen width */
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover; /* Maintain aspect ratio */
  background-position: center;
  transition: opacity 1s ease-in-out;
  opacity: ${props => (props.active === 'true' ? '1' : '0')};
  left: 20%; /* Center the slide horizontally */
  box-sizing: border-box; /* Ensure padding and border are included in the element's total width and height */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SlideControls = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

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
  margin-top: 2rem;
`;

const ProductCard = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer; /* Indicate that the card is clickable */
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05); /* Slightly enlarge the card on hover */
  }
`;

const ProductImage = styled.img`
  width: 150px;  /* Resim genişliğini küçültme */
  height: auto;  /* Oranları koruyarak yüksekliği ayarlama */
  border-radius: 4px;
  margin-bottom: 0.5rem;  /* Başlık ve fiyat arasında boşluk bırakma */
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;  /* Başlık boyutunu küçültme */
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1rem;  /* Fiyat boyutunu küçültme */
  color: #333;
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
  height: 100px; /* Set a fixed height to maintain consistency */
  object-fit: cover; /* Ensures the image covers the space without distortion */
  border-radius: 8px;
`;

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([
    'https://img.freepik.com/free-photo/young-handsome-man-choosing-clothes-shop_1303-19722.jpg?t=st=1722302049~exp=1722305649~hmac=0eb2adf10026e52f378ae212ac7ec7caae0aa94c4c178be23fb4df4c8f156a85&w=1380',
    'https://img.freepik.com/free-photo/top-view-smartphone-with-keyboard-charger_23-2149404179.jpg?t=st=1722302108~exp=1722305708~hmac=eca0e44b37999ad30091fce87e563d96773c1879755786bdb0599d769a25afc9&w=1380',
    'https://img.freepik.com/free-photo/model-demonstrating-earrings-ring_7502-7042.jpg?t=st=1722302145~exp=1722305745~hmac=b6d183ec69080378948058fb49a7e7ed6297791a5fcc8f1542b44b217b9a31fb&w=1380'
  ]);

  useEffect(() => {
    // Fetch products and categories
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);

        // Assuming you have a way to get categories from products
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Define your categories with image URLs
  const categoriesWithImages = [
    { name: 'Electronics', image: 'https://example.com/electronics.jpg' },
    { name: 'Fashion', image: 'https://example.com/fashion.jpg' },
    { name: 'Home', image: 'https://example.com/home.jpg' },
    // Add more categories as needed
  ];

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

      <Section>
        <h2>Categories</h2>
        <CategorySection>
          {categoriesWithImages.map(category => (
            <Category key={category.name}>
              <CategoryImage src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </Category>
          ))}
        </CategorySection>
      </Section>

      <Section>
        <h2>Special Offers</h2>
        <p>Check out our latest deals and discounts!</p>
        {/* Add promotional banners or offers here */}
      </Section>
    </div>
  );
};

export default HomePage;
