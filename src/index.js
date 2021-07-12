import ReactDOM from 'react-dom';
/* Import apollo client */
import apolloClient from './apollo/config';
import { ApolloProvider } from '@apollo/client';

import * as serviceWorker from './serviceWorker';

import AuthContext from './AuthContext';

import { App } from './App';

ReactDOM.render(
	<AuthContext.Provider>
		<ApolloProvider client={apolloClient}>
			<App />
		</ApolloProvider>
	</AuthContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
