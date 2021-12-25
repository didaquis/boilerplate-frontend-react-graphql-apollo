import { useState, Fragment } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';

import { ErrorAlert } from '../ErrorAlert';
import { SubmitButton } from '../SubmitButton';
import { SubmitButtonHelper } from '../SubmitButtonHelper';

import { useInputValue } from '../../hooks/useInputValue';
import { validateLoginForm } from '../../utils/validations';

import { LOGIN } from '../../gql/mutations/auth';

export const LoginForm = ({ activateAuth }) => {

	const [isDisabled, setIsDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const [ authUser ] = useMutation(LOGIN);

	const email = useInputValue('');
	const password = useInputValue('');

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsDisabled(true);
		setIsLoading(true);
		setError(null);

		const variables = { email: email.value, password: password.value };

		authUser({ variables }).then(({ data }) => {
			const { token } = data.authUser;
			activateAuth(token);
		}).catch(e => {
			setError(e.message);
			setIsDisabled(false);
			setIsLoading(false);
		});
	};

	return (
		<Fragment>
			<form className="form-row mb-3" disabled={isDisabled} onSubmit={handleSubmit}>
				<div className="form-group col-md-6">
					<label htmlFor="inputEmailLoginForm" className="text-light">Email <span className="text-danger">*</span></label>
					<input disabled={isDisabled} inputMode="email" className="form-control" id="inputEmailLoginForm" placeholder='email' {...email} required autoFocus />
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="inputPasswordLoginForm" className="text-light">Password <span className="text-danger">*</span></label>
					<input disabled={isDisabled} className="form-control" id="inputPasswordLoginForm" placeholder='password' type='password' {...password} required />
				</div>
				<div className="mt-2 ml-1">
					<SubmitButton disabled={isDisabled || !validateLoginForm(email.value, password.value)}>
						{
							(!isLoading)
								?
									'Log in'
								:
									<Fragment>
										<span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
										<span>Loading</span>
									</Fragment>
						}
					</SubmitButton>
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
