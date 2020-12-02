import React from 'react'
import { useQuery } from '@apollo/client'

import { Spinner } from './Spinner'
import { ErrorAlert } from './ErrorAlert'
import { ListOfUsers } from './ListOfUsers'

import { LIST_ALL_USERS } from '../gql/queries/users'

export const GetListOfUsers = () => {
	const minuteInMilliseconds = 60000
	const tenMinutes = minuteInMilliseconds * 10
	const { loading, error, data } = useQuery(LIST_ALL_USERS, { fetchPolicy: 'no-cache', pollInterval: tenMinutes });

	if (loading) return <Spinner />
	if (error) return <ErrorAlert errorMessage={error.message} />

	return <ListOfUsers users={data.listAllUsers} />
}