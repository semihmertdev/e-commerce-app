// src/components/ConfirmModal.jsx
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

// Modal component styled
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
  z-index: 1000; // Make sure it's above other content
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

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm }) => (
  <StyledModal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
    <ModalContent>
      <h2>Are you sure you want to remove this item from the cart?</h2>
      <div>
        <ModalButton onClick={onConfirm}>Yes, Remove</ModalButton>
        <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
      </div>
    </ModalContent>
  </StyledModal>
);

export default ConfirmModal;
