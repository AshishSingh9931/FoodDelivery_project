import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {

    const exist = cartItems.find((x) => x.name === item.name);

    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.name === item.name ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};