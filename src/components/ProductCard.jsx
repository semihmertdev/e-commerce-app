// src/components/ProductCard.jsx
import { useState } from 'react';
import styled from 'styled-components';

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

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card>
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <QuantityContainer>
        <Button onClick={() => setQuantity(quantity - 1)}>-</Button>
        <QuantityInput
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
      </QuantityContainer>
      <Button onClick={() => addToCart(product, quantity)}>Add to Cart</Button>
    </Card>
  );
}

export default ProductCard;
