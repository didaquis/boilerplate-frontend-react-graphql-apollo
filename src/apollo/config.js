import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { recoverSession } from '../utils/utils';

/* Configuration imported from '.env' file */
const backendProtocol 	= process.env.REACT_APP_PROTOCOL;
const backendHost 		= process.env.REACT_APP_HOST;
const backendPort 		= process.env.REACT_APP_PORT;
const backendGraphql 	= process.env.REACT_APP_GRAPHQL;

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}${backendGraphql}`;

const apolloClient = new ApolloClient({
	uri: backendAddress,
	fetchOptions: {
		credentials: 'include'
	},
	request: operation => {
		const token = recoverSession('token');
		operation.setContext({
			headers: {
				authorization: token
			}
		});
	},
	cache: new InMemoryCache({
		addTypename: false
	}),
	onError: ({ networkError, graphQLErrors }) => {
		console.error('graphQLErrors', graphQLErrors);
		console.error('networkError', networkError);
	}
});

export default apolloClient;
