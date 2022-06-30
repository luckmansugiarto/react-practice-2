import { useState } from 'react';
import {
	signInAuthUserWithEmailAndPassword,
	signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import { BUTTON_TYPE, Button } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (e) {
			if (e.code === 'auth/wrong-password') {
				alert('Incorrect credentials');
				return false;
			} else {
				console.log(e);
			}
		}
	};

	const handleGoogleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInWithGooglePopup();
		} catch (e) {
			console.log(e);
			return false;
		}
	};

	return (
		<div className='sign-in-container'>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					inputOptions={{
						type: 'email',
						required: 'required',
						onChange: handleChange,
						name: "email",
						value: email
					}} />

				<FormInput
					label='Password'
					inputOptions={{
						type: 'password',
						required: 'required',
						onChange: handleChange,
						name: "password",
						value: password
					}} />

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button buttonType={BUTTON_TYPE.GOOGLE} type='button' onClick={handleGoogleSubmit}>
						Sign In With Google
					</Button>
				</div>
			</form>
		</div>
	)
};

export default SignInForm;