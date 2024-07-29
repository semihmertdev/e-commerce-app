// src/components/ConfirmModal.jsx

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const FavoriteButton = styled(ModalButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const ItemColor = styled.div`
  margin-top: 0.5rem;
  background-color: ${props => props.color};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
`;

const ItemSize = styled.p`
  margin: 0;
`;

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, onConfirmAndAddToFavorites, item }) => (
  <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
    <ModalContent>
      <h2>Are you sure you want to remove this item from the cart?</h2>
      {item && (
        <>
          <p>{item.title}</p>
          <ItemSize>Size: {item.size}</ItemSize>
          <ItemColor color={item.color} />
        </>
      )}
      <div>
        <ModalButton onClick={onConfirm}>Yes, Remove</ModalButton>
        <FavoriteButton onClick={onConfirmAndAddToFavorites}>Yes and Add to Favorites</FavoriteButton>
        <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
      </div>
    </ModalContent>
  </StyledModal>
);

export default ConfirmModal;
