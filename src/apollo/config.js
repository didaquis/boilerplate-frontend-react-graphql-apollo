import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client'
import { recoverSession, deleteSession } from '../utils/session'

/* Configuration imported from '.env' file */
const backendProtocol 	= process.env.REACT_APP_PROTOCOL;
const backendHost 		= process.env.REACT_APP_HOST;
const backendPort 		= process.env.REACT_APP_PORT;
const backendGraphql 	= process.env.REACT_APP_GRAPHQL;

const backendAddress = `${backendProtocol}://${backendHost}:${backendPort}${backendGraphql}`;

const httpLink = new HttpLink({
	uri: backendAddress
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const token = recoverSession('token');
	const authorization = token ? `Bearer ${token}` : ''
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			authorization: authorization,
		},
	}));
  
	return forward(operation);
});


const link = ApolloLink.from([authMiddleware, httpLink])

const apolloClient = new ApolloClient({
	link,
	onError: (error) => {
		console.log('onError apollo client')
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
