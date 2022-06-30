import './button.styles.scss';

export const BUTTON_TYPE = {
	GOOGLE: 'google-sign-in',
	INVERTED: 'inverted'
};

/*
	children is a special prop that automatically refers to the
	innerHtml element inside the <button> tag
 */
export const Button = ({ children, buttonType, ...buttonProps }) => {
	return (
		<button className={`button-container ${buttonType}`} {...buttonProps} >
			{children}
		</button>
	)
};