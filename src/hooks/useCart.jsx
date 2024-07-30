import { useState, createContext, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, size, color) => {
    if (!product || typeof quantity !== 'number' || quantity <= 0) {
      console.error('Invalid product or quantity');
      return;
    }

    const existingProduct = cart.find(
      (item) =>
        item.id === product.id && item.size === size && item.color === color
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      if (!product.id || !product.title || !product.image || typeof product.price !== 'number') {
        console.error('Product object is missing required properties');
        return;
      }

      setCart([
        ...cart,
        { id: product.id, title: product.title, image: product.image, price: product.price, quantity, size, color },
      ]);
    }
  };

  const updateCartQuantity = (productId, size, color, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, size, color) => {
    setCart(
      cart.filter(
        (item) => item.id !== productId || item.size !== size || item.color !== color
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};