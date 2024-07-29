// src/components/ProductCard.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useCart } from '../hooks/useCart'; // Import useCart hook

const HeartIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  position: relative;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1rem;
  color: #888;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => (props.$isFavorite ? 'red' : '#ccc')}; /* Update color based on favorite status */

  &:hover {
    color: ${props => (props.$isFavorite ? '#e57373' : '#888')}; /* Update hover color */
  }
`;

function ProductCard({ product }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart(); // Get addToCart from useCart hook
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`} onClick={() => addToCart(product, 1)}>
        <ProductImage src={product.image} alt={product.title} />
        <Title>{product.title}</Title>
        <Price>${product.price}</Price>
      </Link>
      <FavoriteButton $isFavorite={isFavorite} onClick={handleFavoriteToggle}>
        <HeartIcon />
      </FavoriteButton>
    </Card>
  );
}

export default ProductCard;
