// src/hooks/useCart.jsx

import { useState, createContext, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size, color) => {
    const existingProduct = cart.find(item => item.id === product.id && item.size === size && item.color === color);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity, size, color }]);
    }
  };

  const updateCartQuantity = (productId, size, color, quantity) => {
    setCart(cart.map(item =>
      item.id === productId && item.size === size && item.color === color
        ? { ...item, quantity }
        : item
    ));
  };

  const removeFromCart = (productId, size, color) => {
    setCart(cart.filter(item => item.id !== productId || item.size !== size || item.color !== color));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
