import { useQuery } from '@apollo/client';

import { Spinner } from './Spinner';
import { ErrorAlert } from './ErrorAlert';
import { ListOfUsers } from './ListOfUsers';

import { LIST_ALL_USERS } from '../gql/queries/users';

export const GetListOfUsers = () => {
	const { loading, error, data, startPolling, stopPolling } = useQuery(LIST_ALL_USERS, { fetchPolicy: 'no-cache' });

	if (loading) return <Spinner />;
	if (error) return <ErrorAlert errorMessage={error.message} />;

	return <ListOfUsers users={data.listAllUsers} startPolling={startPolling} stopPolling={stopPolling} />;
};