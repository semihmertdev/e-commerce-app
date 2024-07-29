// src/pages/CartPage.jsx
import { useCart } from '../hooks/useCart';
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 1rem;
`;

const CartItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 0.5rem 0;
`;

const ItemTitle = styled.h3`
  font-size: 1rem;
`;

const ItemDetails = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

function CartPage() {
  const { cart } = useCart();

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <CartItem key={index}>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemDetails>Quantity: {item.quantity}</ItemDetails>
          <ItemDetails>Price: ${item.price}</ItemDetails>
        </CartItem>
      ))}
    </CartContainer>
  );
}

export default CartPage;
