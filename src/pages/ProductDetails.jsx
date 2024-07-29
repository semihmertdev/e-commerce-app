import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart'; // Import useCart hook

const DetailsContainer = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #666;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  margin: 0 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  const { addToCart } = useCart(); // Get addToCart function from useCart

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <DetailsContainer>
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <Description>{product.description}</Description>
      <QuantityContainer>
        <Button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</Button>
        <QuantityInput
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(Number(e.target.value), 1))}
        />
        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
      </QuantityContainer>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </DetailsContainer>
  );
}

export default ProductDetails;
