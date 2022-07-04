import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './cart-dropdown.styles.scss';
import { Button } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../contexts/cart.context';

const CartDropdown = () => {
	const { cartItems, setIsCartOpen } = useContext(CartContext);
	const navigate = useNavigate();

	const handleClick = () => {
		setIsCartOpen(false);
		navigate('/checkout');
	}

	return (
		<div className='cart-dropdown-container'>
			{
				cartItems.length > 0
					? (
						<div className='cart-items'>
							{cartItems.map(item => {
								return (<CartItem key={item.id} item={item} />)
							})}
						</div>
					) : (
						<span>Your cart is empty</span>
					)
			}
			<Button onClick={handleClick}>Checkout</Button>
		</div>
	)
}

export default CartDropdown;