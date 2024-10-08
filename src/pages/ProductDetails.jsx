import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

// Styled components
const DetailsContainer = styled.div`
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  min-height: calc(100vh - 200px);
  overflow: auto;
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 500px; /* Fixed height */
  object-fit: contain; /* Shows the entire image without cropping */
  cursor: pointer;
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
  height: 40px;
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
  color: ${props => (props.$isFavorite ? 'red' : '#ccc')};
  transition: color 0.3s ease;

  &:hover {
    color: ${props => (props.$isFavorite ? '#e57373' : '#888')};
  }
`;

const SizeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const SizeButton = styled.button`
  padding: 0.5rem;
  border: 2px solid ${props => (props.$isSelected ? '#333' : '#ccc')};
  border-radius: 4px;
  background-color: ${props => (props.$isSelected ? '#eee' : '#fff')};
  cursor: pointer;
  transition: border 0.3s ease;
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const ColorSwatch = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => (props.$isSelected ? '#333' : '#ccc')};
  cursor: pointer;
  transition: border 0.3s ease;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
`;

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === product?.id);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Reset size and color for new product
        setSelectedSize(null);
        setSelectedColor(null);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const isSizeRequired = product.category !== 'jewelery' && product.category !== 'electronics';
    if (
      (isSizeRequired && !selectedSize) ||
      (isSizeRequired && !selectedColor)
    ) {
      setShowModal(true);
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success('Product added to cart!'); // Show success toast message
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <DetailsContainer>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.title} />
        </ImageContainer>
        <ContentContainer>
          <Title>{product.title}</Title>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
          {product.category !== 'jewelery' && product.category !== 'electronics' && (
            <>
              <SizeContainer>
                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                  <SizeButton
                    key={size}
                    $isSelected={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizeContainer>
              <ColorContainer>
                {['#000000', '#FFFFFF', '#808080', '#A52A2A'].map(color => (
                  <ColorSwatch
                    key={color}
                    color={color}
                    $isSelected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </ColorContainer>
            </>
          )}
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
              {isFavorite ? '❤️' : '🤍'}
            </FavoriteButton>
          </ButtonsContainer>
        </ContentContainer>
      </DetailsContainer>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>Please select all required options before adding to cart.</p>
            <button onClick={handleModalClose}>Close</button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default ProductDetails;
