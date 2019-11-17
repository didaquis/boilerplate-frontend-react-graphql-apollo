import React, { Fragment, useContext } from 'react'
import { Link } from '@reach/router'

import { AuthContext } from '../AuthContext'

import { LoginMutation } from '../containers/LoginMutation'

import { LoginForm } from '../components/LoginForm'

export const Auth = () => {

	const { activateAuth } = useContext(AuthContext)
	const { isAuth } = useContext(AuthContext)

	return (
		<Fragment>
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
			{ 
				!isAuth && <Link className="text-light font-weight-light" to='/register'>
					Don't have an account? <span role="img" aria-label="Winking Face">😉</span>
				</Link>
			}
		</Fragment>
	)
}