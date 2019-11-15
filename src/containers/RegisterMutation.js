import React from 'react'

import { Mutation } from 'react-apollo'

import { REGISTER } from '../gql/mutations/auth';

export const RegisterMutation = ( { children } ) => {
	return (
		<Mutation mutation={REGISTER}>
			{children}
		</Mutation>
	)
}
