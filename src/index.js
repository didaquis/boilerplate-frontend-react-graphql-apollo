import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import apolloClient from './apollo/config';
import { ApolloProvider } from '@apollo/client';

import * as serviceWorker from './serviceWorker';

import AuthContext from './AuthContext';

import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<AuthContext.Provider>
		<ApolloProvider client={apolloClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</AuthContext.Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
