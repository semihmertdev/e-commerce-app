import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';
import { useLocation } from 'react-router-dom';

// Styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
`;

const Notification = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  z-index: 1000;
  display: ${({ show }) => (show ? 'block' : 'none')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
`;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search');
    
    if (searchTerm) {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  const handleShowNotification = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div>
      <Notification show={showNotification}>Product added to cart!</Notification>
      <Container>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              showNotification={handleShowNotification}
            />
          ))
        ) : (
          <NoResults>No products found matching your search.</NoResults>
        )}
      </Container>
    </div>
  );
}

export default ShopPage;