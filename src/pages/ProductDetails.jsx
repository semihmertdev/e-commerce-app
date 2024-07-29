// src/pages/ProductDetails.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <DetailsContainer>
      <Title>{product.title}</Title>
      <Price>${product.price}</Price>
      <Description>{product.description}</Description>
    </DetailsContainer>
  );
}

export default ProductDetails;
