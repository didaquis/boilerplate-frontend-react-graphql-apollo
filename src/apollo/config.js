import ApolloClient from 'apollo-boost';
import { recoverSession } from '../utils/utils';

/* Configuration imported from '.env' file */
const backendProtocol 	= process.env.REACT_APP_PROTOCOL;
const backendHost 		= process.env.REACT_APP_HOST;
const backendPort 		= process.env.REACT_APP_PORT;
const backendGraphql 	= process.env.REACT_APP_GRAPHQL;

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}${backendGraphql}`;

const apolloClient = new ApolloClient({
	uri: backendAddress,
	request: operation => {
		const token = recoverSession('token');
		const authorization = token ? `Bearer ${token}` : '';
		operation.setContext({
			headers: {
				authorization
			}
		})
	},
	onError: ({ networkError, graphQLErrors }) => {
		console.error('graphQLErrors', graphQLErrors);
		console.error('networkError', networkError);
		if (networkError && networkError.response === 'invalid_token') {
			window.sessionStorage.removeItem('token')
			window.location.href = '/'
		}
	}
});

export default apolloClient;
