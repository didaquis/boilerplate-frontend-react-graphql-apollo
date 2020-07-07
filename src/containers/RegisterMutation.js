import React from 'react'
import PropTypes from 'prop-types'

import { useMutation } from '@apollo/client'

import { REGISTER } from '../gql/mutations/auth'

export const RegisterMutation = ( { children } ) => {

	return ''
	return (
		<useMutation mutation={REGISTER}>
			{children}
		</useMutation>
	)
}

RegisterMutation.propTypes = {
	children: PropTypes.func.isRequired
}