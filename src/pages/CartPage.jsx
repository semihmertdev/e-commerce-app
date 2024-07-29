
// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites'; // Yeni eklenen
import styled from 'styled-components';
import ConfirmModal from '../components/ConfirmModal';

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const CartItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
`;

const Price = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuantityDisplay = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 1rem;

  &:hover {
    background-color: #c82333;
  }
`;

const TotalAmount = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: right;
`;

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const { addToFavorites } = useFavorites(); // Yeni eklenen
  const [modalOpen, setModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleQuantityChange = (id, increment) => {
    const newQuantity = cart.find(item => item.id === id)?.quantity + increment;
    if (newQuantity > 0) {
      updateCartQuantity(id, newQuantity);
    }
  };

  const handleRemove = (item) => {
    setItemToRemove(item);
    setModalOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove.id);
      setModalOpen(false);
    }
  };

  const confirmRemoveAndAddToFavorites = () => {
    if (itemToRemove !== null) {
      removeFromCart(itemToRemove.id);
      addToFavorites(itemToRemove);
      setModalOpen(false);
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <CartContainer>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <CartItem key={item.id}>
          <ItemDetails>
            <ItemTitle>{item.title}</ItemTitle>
            <Price>Price: ${item.price}</Price>
          </ItemDetails>
          <QuantityContainer>
            <QuantityButton onClick={() => handleQuantityChange(item.id, -1)}>-</QuantityButton>
            <QuantityDisplay>{item.quantity}</QuantityDisplay>
            <QuantityButton onClick={() => handleQuantityChange(item.id, 1)}>+</QuantityButton>
          </QuantityContainer>
          <RemoveButton onClick={() => handleRemove(item)}>Remove</RemoveButton>
        </CartItem>
      ))}
      <TotalAmount>Total: ${totalAmount}</TotalAmount>
      <ConfirmModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onConfirm={confirmRemove}
        onConfirmAndAddToFavorites={confirmRemoveAndAddToFavorites}
      />
    </CartContainer>
  );
}

export default CartPage;

