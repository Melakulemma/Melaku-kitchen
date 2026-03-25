import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
  );
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  );
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const addToCart = (product, qty) => {
    if (!product._id) {
      console.error('Cannot add product without _id:', product);
      return;
    }
    const existItem = cartItems.find((x) => x.product === product._id);
    if (existItem) {
      setCartItems(cartItems.map((x) => (x.product === existItem.product ? { ...x, qty: x.qty + qty } : x)));
    } else {
      setCartItems([...cartItems, {
        product: product._id,
        name_en: product.name_en,
        name_am: product.name_am,
        image: product.image,
        price: product.price,
        qty
      }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x.product !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <StoreContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, userInfo, setUserInfo, theme, toggleTheme }}>
      {children}
    </StoreContext.Provider>
  );
};
