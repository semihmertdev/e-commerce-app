import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';

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

function ShopPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            showNotification={handleShowNotification}
          />
        ))}
      </Container>
    </div>
  );
}

export default ShopPage;
