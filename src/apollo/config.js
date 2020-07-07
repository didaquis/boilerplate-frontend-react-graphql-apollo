import { ApolloClient, InMemoryCache } from '@apollo/client'
import { recoverSession, deleteSession } from '../utils/session'

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
		const authorization = token ? `Bearer ${token}` : ''

		operation.setContext({
			headers: {
				authorization
			}
		})
	},
	onError: (error) => {
		if (error.graphQLErrors) {
			error.graphQLErrors.forEach(err => {
				if (err.extensions.code === 'UNAUTHENTICATED' || err.extensions.code === 'FORBIDDEN') {
					deleteSession()
					window.location.href = '/'
				}
			})
		}

		const { networkError } = error;
		if (networkError && networkError.response === 'invalid_token') {
			deleteSession()
			window.location.href = '/'
		}
	},
	cache: new InMemoryCache()
});

export default apolloClient;
