import React, { Fragment, useContext } from 'react'

import { AuthContext } from '../AuthContext'

import { RegisterMutation } from '../containers/RegisterMutation'

import { PageTitle } from '../components/PageTitle'
import { RegisterForm } from '../components/RegisterForm'


export const Registration = () => {

	const { activateAuth } = useContext(AuthContext)

	return (
		<Fragment>
			<PageTitle text='Create an account' />
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

						return <RegisterForm disabled={loading} error={errorMsg} onSubmit={onSubmit} />
					}
				}
			</RegisterMutation>
		</Fragment>
	)
}