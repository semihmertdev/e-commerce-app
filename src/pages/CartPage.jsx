// CartPage.jsx

import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import styled from 'styled-components';
import ConfirmModal from '../components/ConfirmModal';
import OrderCompleteModal from '../components/OrderCompleteModal';
import EmptyCartModal from '../components/EmptyCartModal';

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const CartItems = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media(min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const CartItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: #FCC730; /* Updated color */
`;

const Price = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const ItemSize = styled.p`
  margin: 0;
`;

const ItemColor = styled.div`
  margin-top: 0.5rem;
  background-color: ${props => props.color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const QuantityButton = styled.button`
  background-color: #FCC730; /* Updated color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7b900; /* Slightly darker yellow */
  }
`;

const QuantityDisplay = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background-color: #FCC730; /* Updated color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: auto;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7b900; /* Slightly darker yellow */
  }
`;

const TotalAmount = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
  color: #FCC730; /* Updated color */
`;

const CompleteOrderButton = styled.button`
  background-color: #FCC730; /* Updated color */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 2rem;
  display: block;
  width: 100%;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f7b900; /* Slightly darker yellow */
  }
`;

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useCart();
  const { addToFavorites } = useFavorites();
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [orderCompleteModalOpen, setOrderCompleteModalOpen] = useState(false);
  const [emptyCartModalOpen, setEmptyCartModalOpen] = useState(false);

  const handleQuantityChange = (id, size, color, increment) => {
    const newQuantity = cart.find(item => item.id === id && item.size === size && item.color === color)?.quantity + increment;
    if (newQuantity > 0) {
      updateCartQuantity(id, size, color, newQuantity);
    }
  };

  const handleRemove = (item) => {
    setItemToRemove(item);
    setConfirmModalOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove.id, itemToRemove.size, itemToRemove.color);
      setConfirmModalOpen(false);
    }
  };

  const confirmRemoveAndAddToFavorites = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove.id, itemToRemove.size, itemToRemove.color);
      addToFavorites(itemToRemove);
      setConfirmModalOpen(false);
    }
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) {
      setEmptyCartModalOpen(true);
    } else {
      clearCart();
      setOrderCompleteModalOpen(true);
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      <CartItems>
        {cart.map((item) => (
          <CartItem key={`${item.id}-${item.size}-${item.color}`}>
            <ItemImage src={item.image} alt={item.title} />
            <div>
              <ItemDetails>
                <ItemTitle>{item.title}</ItemTitle>
                <Price>Price: ${item.price}</Price>
                <ItemSize>Size: {item.size}</ItemSize>
                <ItemColor color={item.color} />
              </ItemDetails>
              <QuantityContainer>
                <QuantityButton onClick={() => handleQuantityChange(item.id, item.size, item.color, -1)}>-</QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(item.id, item.size, item.color, 1)}>+</QuantityButton>
                <RemoveButton onClick={() => handleRemove(item)}>Remove</RemoveButton>
              </QuantityContainer>
            </div>
          </CartItem>
        ))}
      </CartItems>
      <TotalAmount>Total: ${totalAmount}</TotalAmount>
      <CompleteOrderButton onClick={handleCompleteOrder}>Complete Order</CompleteOrderButton>
      <ConfirmModal
        isOpen={confirmModalOpen}
        onRequestClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmRemove}
        onConfirmAndAddToFavorites={confirmRemoveAndAddToFavorites}
        item={itemToRemove}
      />
      <OrderCompleteModal
        isOpen={orderCompleteModalOpen}
        onRequestClose={() => setOrderCompleteModalOpen(false)}
      />
      <EmptyCartModal
        isOpen={emptyCartModalOpen}
        onRequestClose={() => setEmptyCartModalOpen(false)}
      />
    </CartContainer>
  );
}

export default CartPage;
