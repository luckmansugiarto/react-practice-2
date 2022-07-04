import { useContext } from 'react';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from './shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
	const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

	const toggleCartOpen = () => {
		setIsCartOpen(!isCartOpen);
	};

	return (
		<div className='cart-icon-container' onClick={toggleCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{cartCount}</span>
		</div>
	);
};

export default CartIcon;