import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart'; // Import useCart hook
import { useFavorites } from '../hooks/useFavorites'; // Import useFavorites hook

const DetailsContainer = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 500px;
  display: block;
  margin: 0 auto 1rem;
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

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props => (props.$isFavorite ? 'red' : '#ccc')}; /* Color based on favorite status */

  &:hover {
    color: ${props => (props.$isFavorite ? '#e57373' : '#888')};
  }
`;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addToCart } = useCart(); // Get addToCart function from useCart
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites(); // Get favorite functions
  const isFavorite = favorites.some((fav) => fav.id === product?.id); // Check if the product is a favorite

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <DetailsContainer>
      <ProductImage src={product.image} alt={product.title} />
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
      <FavoriteButton $isFavorite={isFavorite} onClick={handleFavoriteToggle}>
        {isFavorite ? '❤️' : '🤍'} {/* Change icon based on favorite status */}
      </FavoriteButton>
    </DetailsContainer>
  );
}

export default ProductDetails;
