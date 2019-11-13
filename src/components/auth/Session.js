import React from 'react'
import { Query } from 'react-apollo';

import { USUARIO_ACTUAL } from '../../gql/queries/auth';

/* High Order Component */
const Session = (Component) => (props) => {
	return (
		<Query query={USUARIO_ACTUAL}>
			{({loading, error, data, refetch}) => {
				if (loading) {
					return null;
				}
				if (error) {
					console.error(error); 
					return null;
				}
				return (
					<Component {...props} refetch={refetch} session={data} />
				);
			}}
		</Query>
	);
}

export default Session;