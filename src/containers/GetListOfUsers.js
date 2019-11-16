import React from 'react'
import { ListOfUsers } from '../components/ListOfUsers'
import { Spinner } from '../components/Spinner'
import { ErrorAlert } from '../components/ErrorAlert'

import { Query } from 'react-apollo'

import { LIST_ALL_USERS } from '../gql/queries/users';

const renderProp = ( { loading, error, data } ) => {
	if (loading) return <Spinner key={'loading'} />
	if (error) return <ErrorAlert errorMessage={error.message} />

	const users = data.listAllUsers || []
	
	return <ListOfUsers users={users} />
}

export const UsersWithQuery = () => (
	<Query query={LIST_ALL_USERS} fetchPolicy="cache-and-network">
		{
			renderProp
		}
	</Query>
)