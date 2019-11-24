import React, { Fragment } from 'react'
import { SubmitButton } from '../SubmitButton'
import { ErrorAlert } from '../ErrorAlert'

import { useInputValue } from '../../hooks/useInputValue'
import { validateLoginForm } from '../../utils/utils'


export const LoginForm = ({ error, disabled, onSubmit }) => {

	const email = useInputValue('')
	const password = useInputValue('')

	const handleSubmit = (event) => {
		event.preventDefault()
		onSubmit({ email: email.value, password: password.value })
	}

	return (
		<Fragment>
			<form className="form-row mb-3" disabled={disabled} onSubmit={handleSubmit}>
				<div className="form-group col-md-6">
					<label htmlFor="inputEmailLoginForm" className="text-light">Email</label>
      				<input disabled={disabled} className="form-control" id="inputEmailLoginForm" placeholder='email' {...email} required autoFocus />
				</div>
				<div className="form-group col-md-6">
					<label htmlFor="inputPasswordLoginForm" className="text-light">Password</label>
      				<input disabled={disabled} className="form-control" id="inputPasswordLoginForm" placeholder='password' type='password' {...password} required />
				</div>
				<div className="mt-2 ml-1">
					<SubmitButton disabled={disabled || !validateLoginForm(email.value, password.value)}>Log in</SubmitButton>
				</div>
			</form>
			{
				error && <ErrorAlert errorMessage={error} />
			}
		</Fragment>
	)
}

