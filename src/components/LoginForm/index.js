import React, { useState, Fragment } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { ErrorAlert } from '../ErrorAlert';
import { SubmitButton } from '../SubmitButton';
import { SubmitButtonHelper } from '../SubmitButtonHelper';

import { useInputValue } from '../../hooks/useInputValue';
import { validateLoginForm } from '../../utils/validations';

import { LOGIN } from '../../gql/mutations/auth';

export const LoginForm = ({ activateAuth }) => {

	const [disabled, setDisabled] = useState(false);
	const [error, setError] = useState(null);

	const [ authUser ] = useMutation(LOGIN);

	const email = useInputValue('');
	const password = useInputValue('');

	const handleSubmit = (event) => {
		event.preventDefault();
		setDisabled(true);
		setError(null);

		const variables = { email: email.value, password: password.value };

		authUser({ variables }).then(({ data }) => {
			const { token } = data.authUser;
			activateAuth(token);
		}).catch(e => {
			setError(e.message);
			setDisabled(false);
		});
	};

	return (
		<Fragment>
			<form className="form-row mb-3" disabled={disabled} onSubmit={handleSubmit}>
				<div className="form-group col-md-6">
					<label htmlFor="inputEmailLoginForm" className="text-light">Email <span className="text-danger">*</span></label>
					<input disabled={disabled} inputMode="email" className="form-control" id="inputEmailLoginForm" placeholder='email' {...email} required autoFocus />
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="inputPasswordLoginForm" className="text-light">Password <span className="text-danger">*</span></label>
					<input disabled={disabled} className="form-control" id="inputPasswordLoginForm" placeholder='password' type='password' {...password} required />
				</div>
				<div className="mt-2 ml-1">
					<SubmitButton disabled={disabled || !validateLoginForm(email.value, password.value)}>Log in</SubmitButton>
					<SubmitButtonHelper mustShowHelper={!validateLoginForm(email.value, password.value)}></SubmitButtonHelper>
				</div>
			</form>
			{
				error && <ErrorAlert errorMessage={error} />
			}
		</Fragment>
	);
};

LoginForm.propTypes = {
	activateAuth: PropTypes.func.isRequired,
};
