import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

const HeartIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  width: 200px;
  height: 400px; /* Adjust the height as needed */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;


const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Ensures text doesn't wrap */
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Ensures text doesn't wrap */
`;


const Price = styled.p`
  font-size: 1.4rem; /* Daha büyük font boyutu */
  font-weight: bold; /* Kalın font ağırlığı */
  color: #333; /* Daha koyu renk */
  margin: 0.5rem 0;
  cursor: pointer;
  text-align: center; /* Merkezde hizalama */
  background-color: #f9f9f9; /* Hafif arka plan rengi */
  padding: 0.5rem; /* Arka plan renginin etrafında boşluk */
  border-radius: 4px; /* Hafif yuvarlatılmış köşeler */
  border: 1px solid #ddd; /* Hafif bir sınır */
`;


const ProductImage = styled.img`
  width: 100%;
  height: 200px; /* Sabit yükseklik */
  object-fit: contain; /* Resmi kesmeden tümünü gösterir, ancak alanı kaplamayabilir */
  cursor: pointer;
`;


const FavoriteButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${(props) => (props.$isFavorite ? 'red' : '#ccc')};
  z-index: 10;

  &:hover {
    color: ${(props) => (props.$isFavorite ? '#e57373' : '#888')};
  }
`;

function ProductCard({ product }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();
  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteToggle = (e) => {
    e.stopPropagation(); // Stop the event from propagating up to the Card component
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card onClick={handleProductClick}>
      <ProductImage src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Description>{product.description}</Description>
      <Price>${product.price}</Price>
      <FavoriteButton $isFavorite={isFavorite} onClick={handleFavoriteToggle}>
        <HeartIcon />
      </FavoriteButton>
    </Card>
  );
}

export default ProductCard;
