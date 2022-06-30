import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword ,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import { BUTTON_TYPE, Button } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password != confirmPassword) {
			alert('password and confirm password do not match!');
			return false;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (e) {
			if (e.code === 'auth/email-already-in-user') {
				alert(`${email} already in use`);
				return false;
			} else {
				console.log(e);
			}
		}
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					inputOptions={{
						type:'text',
						required: 'required',
						onChange: handleChange,
						name: "displayName",
						value: displayName
					}} />

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

				<FormInput
					label='Confirm Password'
					inputOptions={{
						type: 'password',
						required: 'required',
						onChange: handleChange,
						name: "confirmPassword",
						value: confirmPassword
					}} />

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	)
};

export default SignUpForm;