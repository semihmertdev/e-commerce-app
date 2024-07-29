import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ... (önceki styled components aynı kalacak)
const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  width: 200px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1rem;
  color: #888;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

const QuantityInput = styled.input`
  width: 40px;
  text-align: center;
  margin: 0 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;


function ProductCard({ product, addToCart, showNotification }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Link'in varsayılan davranışını engelle
    addToCart(product, quantity);
    showNotification();
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <ProductImage src={product.image} alt={product.title} />
        <Title>{product.title}</Title>
      </Link>
      <Price>${product.price}</Price>
      <QuantityContainer>
        <Button onClick={(e) => {
          e.preventDefault();
          setQuantity(Math.max(quantity - 1, 1));
        }}>-</Button>
        <QuantityInput
          type="number"
          value={quantity}
          onChange={(e) => {
            e.preventDefault();
            setQuantity(Math.max(Number(e.target.value), 1));
          }}
        />
        <Button onClick={(e) => {
          e.preventDefault();
          setQuantity(quantity + 1);
        }}>+</Button>
      </QuantityContainer>
      <Button onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductCard;


