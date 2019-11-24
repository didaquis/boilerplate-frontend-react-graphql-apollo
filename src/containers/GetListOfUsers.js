import React from 'react'
import { useQuery } from '@apollo/react-hooks'

import { Spinner } from '../components/Spinner'
import { ErrorAlert } from '../components/ErrorAlert'
import { ListOfUsers } from '../components/ListOfUsers'

import { LIST_ALL_USERS } from '../gql/queries/users'

export const GetListOfUsers = () => {
	const { loading, error, data } = useQuery(LIST_ALL_USERS, { fetchPolicy: 'network-only' });

	if (loading) return <Spinner />
	if (error) return <ErrorAlert errorMessage={error.message} />

	return <ListOfUsers users={data.listAllUsers} />
}