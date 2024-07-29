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

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  margin: 0 0.5rem;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;

  &:hover {
    background-color: #555;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0;
`;

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cart.map((item, index) => (
        <CartItem key={index}>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemDetails>Price: ${item.price}</ItemDetails>
          <QuantityContainer>
            <Button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
            <span>{item.quantity}</span>
            <Button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
          </QuantityContainer>
          <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
        </CartItem>
      ))}
    </CartContainer>
  );
}

export default CartPage;
