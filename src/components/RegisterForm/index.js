import { useState, Fragment } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { ErrorAlert } from '../ErrorAlert';
import { SubmitButton } from '../SubmitButton';
import { SubmitButtonHelper } from '../SubmitButtonHelper';

import { useInputValue } from '../../hooks/useInputValue';
import { validateRegisterForm } from '../../utils/validations';

import { REGISTER } from '../../gql/mutations/auth';

export const RegisterForm = ({ activateAuth }) => {

	const [isDisabled, setIsDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [ registerUser ] = useMutation(REGISTER);

	const email = useInputValue('');
	const password = useInputValue('');
	const repeatPassword = useInputValue('');

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsDisabled(true);
		setIsLoading(true);
		setError(null);

		const variables = { email: email.value, password: password.value };

		registerUser({ variables }).then(({ data }) => {
			const { token } = data.registerUser;
			activateAuth(token);
		}).catch(e => {
			setError(e.message);
			setIsDisabled(false);
			setIsLoading(false);
		});
	};

	return (
		<Fragment>
			<div className="row justify-content-center mt-4">
				<form className="col-md-8" disabled={isDisabled} onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="inputEmailRegisterForm" className="text-light">Email <span className="text-danger">*</span></label>
						<input
							disabled={isDisabled}
							inputMode="email"
							className="form-control"
							id="inputEmailRegisterForm"
							placeholder='email'
							{...email}
							required
							autoFocus
						/>
						<small id="emailHelp" className="form-text text-muted">Make sure it's a valid email address</small>
					</div>
					<div className="form-group">
						<label htmlFor="inputPasswordRegisterForm" className="text-light">Password <span className="text-danger">*</span></label>
						<input
							disabled={isDisabled}
							className="form-control"
							id="inputPasswordRegisterForm"
							placeholder='password'
							type='password'
							{...password}
							required
							pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$"
						/>
						<small id="passwordHelp" className="form-text text-muted">At least 8 characters. It must contain numbers, lowercase letters and uppercase letters. The spaces are not allowed</small>
					</div>
					<div className="form-group">
						<label htmlFor="inputRepeatPasswordRegisterForm" className="text-light">Repeat password <span className="text-danger">*</span></label>
						<input
							disabled={isDisabled}
							className="form-control"
							id="inputRepeatPasswordRegisterForm"
							placeholder='repeat password'
							type='password'
							{...repeatPassword}
							required
							pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$"
						/>
						<small id="repeatPasswordHelp" className="form-text text-muted">At least 8 characters. It must contain numbers, lowercase letters and uppercase letters. The spaces are not allowed</small>
					</div>
					<div className="mt-2 ml-1">
						<SubmitButton disabled={isDisabled || !validateRegisterForm(email.value, password.value, repeatPassword.value)}>
							{
								(!isLoading)
									?
										'Create account'
									:
										<Fragment>
											<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
											<span>Loading</span>
										</Fragment>
							}
						</SubmitButton>
						<SubmitButtonHelper mustShowHelper={!validateRegisterForm(email.value, password.value, repeatPassword.value)}></SubmitButtonHelper>
					</div>
				</form>
				<div className="col-md-8">
				{
					error && <ErrorAlert errorMessage={error} />
				}
				</div>
			</div>
		</Fragment>
	);
};

RegisterForm.propTypes = {
	activateAuth: PropTypes.func.isRequired,
};
