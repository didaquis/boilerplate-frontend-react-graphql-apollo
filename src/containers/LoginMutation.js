import React from 'react'

import { Mutation } from 'react-apollo'

import { LOGIN } from '../gql/mutations/auth';

export const LoginMutation = ( { children } ) => {
	return (
		<Mutation mutation={LOGIN}>
			{children}
		</Mutation>
	)
}
