import { StrictMode, useContext, Suspense, lazy } from 'react';

import { Router, Redirect } from '@reach/router';

import { AuthContext } from './AuthContext';

import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Logout } from './pages/Logout';
import { Page404 } from './pages/Page404';

import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { OnRouteChange } from './components/OnRouteChange';

const Home = lazy(() => import('./pages/Home'));
const UserAdministration = lazy(() => import('./pages/UserAdministration'));


export const App = () => {
	const { isAuth } = useContext(AuthContext);
	const { userData } = useContext(AuthContext);

	return (
		<StrictMode>
			<div className="container-fluid bg-dark">
				<div className="container">
					<Suspense fallback={<Spinner />}>
						<NavBar />
							<main className="pb-4">
								<Router>
									<Page404 default />
									<Home path='/' />

									{
										// If is not authenticated...
									}
									{ !isAuth && <Login path='/login' /> }
									{ !isAuth && <Registration path='/register' /> }
									{ !isAuth && <Redirect from='/user-administration' to='/login' noThrow /> }
									{ !isAuth && <Redirect from='/logout' to='/login' noThrow /> }

									{
										// If it's authenticated user...
									}
									{ isAuth && <Redirect from='/login' to='/' noThrow /> }
									{ isAuth && <Redirect from='/register' to='/' noThrow /> }

									{
										// If it's authenticated user but don't have administrator role...
									}
									{ isAuth && !userData.isAdmin && <Redirect from='/user-administration' to='/' noThrow /> }

									<UserAdministration path='/user-administration' />
									<Logout path='/logout' />
								</Router>
								<OnRouteChange />{/* Use this always after the Reach Router! */}
							</main>
						<div className="row pb-5"></div>
						<Footer />
					</Suspense>
				</div>
			</div>
		</StrictMode>
	);
};
