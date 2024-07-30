import { useFavorites } from '../hooks/useFavorites';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';

const FavoritesContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const FavoritesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
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
        <FavoritesGrid>
          {favorites.map((product) => (
            <ProductCard
              key={product.id} // Use a stable key
              product={product}
              removeFromFavorites={removeFromFavorites}
            />
          ))}
        </FavoritesGrid>
      ) : (
        <NoFavorites>No products in your favorites yet.</NoFavorites>
      )}
    </FavoritesContainer>
  );
}

export default FavoritesPage;
