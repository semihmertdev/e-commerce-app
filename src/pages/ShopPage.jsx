import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

// Styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  background-color: white;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const NoResults = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: none; /* Hide on larger screens */
  flex-wrap: wrap;
  justify-content: center;
  background-color: white;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: flex; /* Show only on mobile */
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 2px solid ${props => (props.selected ? '#FCC730' : '#ccc')}; /* Border color */
  background-color: white;
  color: ${props => (props.selected ? '#FCC730' : '#333')};
  cursor: pointer;
  margin: 0.5rem;
  text-transform: capitalize; /* Capitalize category names */
  font-size: 1rem;

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);

        const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    const categoryFromUrl = searchParams.get('category') || 'All';

    setSelectedCategory(categoryFromUrl);

    const filtered = products.filter(product =>
      (categoryFromUrl === 'All' || product.category === categoryFromUrl) &&
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredProducts(filtered);
  }, [location.search, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div>
      <FilterContainer>
        {categories.map(category => (
          <FilterButton
            key={category}
            selected={selectedCategory === category}
            onClick={() => handleCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
      </FilterContainer>
      <Container>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.some((fav) => fav.id === product.id)}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
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
