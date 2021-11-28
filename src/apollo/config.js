import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { recoverSession, deleteSession } from '../utils/session';

/* Configuration imported from '.env' file */
const backendProtocol 	= process.env.REACT_APP_PROTOCOL;
const backendHost 		= process.env.REACT_APP_HOST;
const backendPort 		= process.env.REACT_APP_PORT;
const backendGraphql 	= process.env.REACT_APP_GRAPHQL;

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}${backendGraphql}`;

const httpLink = new HttpLink({
	uri: backendAddress
});

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = recoverSession('token');
	const authorization = token ? `Bearer ${token}` : '';
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: authorization,
		},
	}));
  
	return forward(operation);
});

const errorLink = onError(({ operation, graphQLErrors, networkError, response }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach(err => {
			// err.message, err.locations, err.path, err.extensions
			if (err.extensions.code === 'UNAUTHENTICATED' || err.extensions.code === 'FORBIDDEN') {
				deleteSession();
				window.location.href = '/';
			}

			if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
				err.message = 'An error has occurred';
			}
		});
	}

	if (networkError && networkError.response === 'invalid_token') {
		deleteSession();
		window.location.href = '/';
	}
});

const link = ApolloLink.from([authMiddleware, errorLink, httpLink]);


const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

export default apolloClient;
