import { useFavorites } from '../hooks/useFavorites';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';

const FavoritesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const NoFavorites = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
`;

function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <FavoritesContainer>
      <h2>Your Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductCard
            key={`${product.id}-${product.title}-${Date.now()}`}
            product={product}
            removeFromFavorites={removeFromFavorites}
          />
        ))
      ) : (
        <NoFavorites>No products in your favorites yet.</NoFavorites>
      )}
    </FavoritesContainer>
  );
}

export default FavoritesPage;