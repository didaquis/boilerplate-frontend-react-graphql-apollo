import React from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'

import { REGISTER } from '../gql/mutations/auth'

export const RegisterMutation = ( { children } ) => {
	return (
		<Mutation mutation={REGISTER}>
			{children}
		</Mutation>
	)
}

RegisterMutation.propTypes = {
	children: PropTypes.func.isRequired
}