import React, { Fragment, useContext } from 'react'

import { AuthContext } from '../AuthContext'

import { RegisterMutation } from '../containers/RegisterMutation'
import { LoginMutation } from '../containers/LoginMutation'

import { LoginForm } from '../components/LoginForm'
import { RegisterForm } from '../components/RegisterForm'


export const NotRegisteredUser = () => {

	const { activateAuth } = useContext(AuthContext)

	return (
		<Fragment>
			<RegisterMutation>
				{
					(registerUser, { data, loading, error }) => { // eslint-disable-line no-unused-vars
						const onSubmit = ({ email, password }) => {
							const variables = { email, password }
							registerUser({ variables }).then(({ data }) => {
								const { token } = data.registerUser
								activateAuth(token)
							}).catch(e => {
								console.error(e.message) // eslint-disable-line no-console
							})
						}

						const errorMsg = error && 'Data provided is not valid'

						return <RegisterForm disabled={loading} error={errorMsg} onSubmit={onSubmit} title='Sign up' />
					}
				}
			</RegisterMutation>

			<LoginMutation>
				{
					(authUser, { data, loading, error }) => { // eslint-disable-line no-unused-vars
						const onSubmit = ({ email, password }) => {
							const variables = { email, password }
							authUser({ variables }).then(({ data }) => {
								const { token } = data.authUser
								activateAuth(token)
							}).catch(e => {
								console.error(e.message) // eslint-disable-line no-console
							})
						}

						const errorMsg = error && 'Invalid credentials'

						return <LoginForm disabled={loading} error={errorMsg} onSubmit={onSubmit} title='Log in' />
					}
				}
			</LoginMutation>
		</Fragment>
	)
}