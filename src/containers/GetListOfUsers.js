import React from 'react'

import { ListOfUsers } from '../components/ListOfUsers'
import { Spinner } from '../components/Spinner'
import { ErrorAlert } from '../components/ErrorAlert'

import { Query } from 'react-apollo'

import { LIST_ALL_USERS } from '../gql/queries/users';

const renderProp = ( { loading, error, data } ) => {
	if (loading) return <Spinner key={'loading'} />
	if (error) return <ErrorAlert errorMessage={error.message} />

	return <ListOfUsers users={data.listAllUsers || []} />
}

export const GetListOfUsers = () => (
	<Query query={LIST_ALL_USERS} fetchPolicy="cache-and-network">
		{
			renderProp
		}
	</Query>
)

// ++++++++++++++++++++++++++++++++++++++++++++++++++

// Esta implementación tiene dos problemas: polling constante no deseado y que en algunas situaciones al renderizar los datos la ventana hace un scroll hasta el inicio del componente

// import React from 'react'
// import { useQuery } from 'react-apollo'

// import { Spinner } from '../components/Spinner'
// import { ErrorAlert } from '../components/ErrorAlert'
// import { ListOfUsers } from '../components/ListOfUsers'

// import { LIST_ALL_USERS } from '../gql/queries/users';

// export const GetListOfUsers = () => {
// 	const { loading, error, data } = useQuery(LIST_ALL_USERS);

// 	if (loading) return <Spinner />
// 	if (error) return <ErrorAlert errorMessage={error.message} />

// 	return <ListOfUsers users={data.listAllUsers || []} />
// }
