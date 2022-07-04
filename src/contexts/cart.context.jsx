import { createContext, useEffect, useState } from 'react';
// import {
// } from '../utils/firebase/firebase.utils';

// the actual value we want to access
export const CartContext = createContext({
	addItemToCart: () => {},
	cartCount: 0,
	cartItems: [],
	cartTotal: 0.0,
	isCartOpen: false,
	removeItemFromCart: () => {},
	setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const [cartItems, setCartItems] = useState([]);
	const [cartTotal, setCartTotal] = useState(0.0);
	const addItemToCart = (productToAdd) => {
		const idx = cartItems.findIndex((item) => item.id === productToAdd.id);

		idx >= 0
			? cartItems[idx].quantity++
			: cartItems.push({...productToAdd, quantity: 1});

		setCartItems([...cartItems]);
	};

	const clearCartItem = (productToRemove) => {
		const idx = cartItems.findIndex((item) => item.id === productToRemove.id);

		if (idx >= 0) {
			cartItems.splice(idx, 1);
		}

		setCartItems([...cartItems]);
	};

	const removeItemFromCart = (productToRemove) => {
		const idx = cartItems.findIndex((item) => item.id === productToRemove.id);

		if (idx >= 0) {
			cartItems[idx].quantity - 1 === 0
				? cartItems.splice(idx, 1)
				: cartItems[idx].quantity--;
		}

		setCartItems([...cartItems]);
	};

	// recalculate cart count whenever cartItems changes
	useEffect(() => {
		setCartCount(cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity
		, 0));

		setCartTotal(cartItems.reduce(
			(total, cartItem) => total + (cartItem.quantity * cartItem.price)
			, 0.0
		));
	}, [cartItems]);

	// These are the elements that get exposed to the consumer of this context
	const value = {
		addItemToCart,
		cartCount,
		cartItems,
		cartTotal,
		clearCartItem,
		isCartOpen,
		removeItemFromCart,
		setIsCartOpen
	};

	// useEffect(() => {

	// }, []);

	return <CartContext.Provider value={value}>
		{children}
	</CartContext.Provider>;
}