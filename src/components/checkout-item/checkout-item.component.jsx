import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

export default ({cartItem}) => {
	const { id, imageUrl, name, price, quantity } = cartItem;
	const {
		addItemToCart,
		clearCartItem,
		removeItemFromCart
	} = useContext(CartContext);

	return (
		<div key={id} className='checkout-item-container'>
			<img src={`${imageUrl}`} alt={`${name}`} className='image-container' />
			<span className='name'>{name}</span>
			<span className='quantity'>
				<span
					className='arrow'
					onClick={() => removeItemFromCart(cartItem)}
					>&#10094;</span>
				<span className='value'>{quantity}</span>
				<span
					className='arrow'
					onClick={() => addItemToCart(cartItem)}
					>&#10095;</span>
			</span>
			<span className='price'>{price}</span>
			<span
				className='remove-button'
				onClick={() => {clearCartItem(cartItem)}}
			>
				&#10005;
			</span>
		</div>
	)
}
