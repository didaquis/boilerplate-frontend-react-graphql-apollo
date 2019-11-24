import React from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'

import { LOGIN } from '../gql/mutations/auth'

export const LoginMutation = ( { children } ) => {
	return (
		<Mutation mutation={LOGIN}>
			{children}
		</Mutation>
	)
}

LoginMutation.propTypes = {
	children: PropTypes.func.isRequired
}