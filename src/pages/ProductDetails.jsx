import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart'; // Import useCart hook
import { useFavorites } from '../hooks/useFavorites'; // Import useFavorites hook

const DetailsContainer = styled.div`
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 10px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const ContentContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
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

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  margin: 0 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 40px; /* Ensure input height matches button height */
  font-size: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  width: 90%;

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
  transition: color 0.3s ease; /* Smooth transition for color change */

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
      <ImageContainer>
        <ProductImage src={product.image} alt={product.title} />
      </ImageContainer>
      <ContentContainer>
        <Title>{product.title}</Title>
        <Price>${product.price}</Price>
        <Description>{product.description}</Description>
        <QuantityContainer>
          <QuantityButton onClick={() => setQuantity(Math.max(quantity - 1, 1))}>-</QuantityButton>
          <QuantityInput
            type="text"
            value={quantity}
            readOnly
          />
          <QuantityButton onClick={() => setQuantity(quantity + 1)}>+</QuantityButton>
        </QuantityContainer>
        <ButtonsContainer>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
          <FavoriteButton $isFavorite={isFavorite} onClick={handleFavoriteToggle}>
            {isFavorite ? '❤️' : '🤍'} {/* Change icon based on favorite status */}
          </FavoriteButton>
        </ButtonsContainer>
      </ContentContainer>
    </DetailsContainer>
  );
}

export default ProductDetails;
