import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/client'

import { LOGIN } from '../gql/mutations/auth'

// import { Spinner } from '../components/Spinner'
import { ErrorAlert } from '../components/ErrorAlert'
import { LoginForm } from '../components/LoginForm'


export const LoginMutation = ( { children } ) => {

	const [ authUser, { loading: mutationLoading, error: mutationError, data } ] = useMutation(LOGIN);

	return (
		<Fragment>
		{
			error ? console.log(error): ''
			//error && <ErrorAlert errorMessage={error} />
		}
		<LoginForm disabled={loading} onSubmit={authUser} />
		</Fragment>
	)
}

// export const LoginMutation = ( { children } ) => {
// 	return (
// 		<useMutation mutation={LOGIN}>
// 			{children}
// 		</useMutation>
// 	)
// }

LoginMutation.propTypes = {
	children: PropTypes.func.isRequired
}