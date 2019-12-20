import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { SubmitButton } from '../SubmitButton'
import { SubmitButtonHelper } from '../SubmitButtonHelper'
import { ErrorAlert } from '../ErrorAlert'

import { useInputValue } from '../../hooks/useInputValue'
import { validateRegisterForm } from '../../utils/utils'


export const RegisterForm = ({ error, disabled, onSubmit }) => {

	const email = useInputValue('')
	const password = useInputValue('')
	const repeatPassword = useInputValue('')

	const handleSubmit = (event) => {
		event.preventDefault()
		onSubmit({ email: email.value, password: password.value })
	}

	return (
		<Fragment>
			<div className="row justify-content-center mt-4">
				<form className="col-md-8" disabled={disabled} onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="inputEmailRegisterForm" className="text-light">Email <span className="text-danger">*</span></label>
						<input
							disabled={disabled}
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
							disabled={disabled}
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
							disabled={disabled}
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
						<SubmitButton disabled={disabled || !validateRegisterForm(email.value, password.value, repeatPassword.value)}>Create account</SubmitButton>
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
	)
}

RegisterForm.propTypes = {
	error: PropTypes.string,
	disabled: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
}
