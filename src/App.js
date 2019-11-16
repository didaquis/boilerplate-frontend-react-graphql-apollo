import React, { StrictMode, useContext, Suspense } from 'react';

import { Router, Redirect } from '@reach/router';

import { AuthContext } from './AuthContext'

import { NotRegisteredUser } from './pages/NotRegisteredUser'
import { User } from './pages/User'
import { Page404 } from './pages/Page404'

import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Spinner } from './components/Spinner'

const Home = React.lazy(() => import('./pages/Home'))
const UserAdministration = React.lazy(() => import('./pages/UserAdministration'))


export const App = () => {
	const { isAuth } = useContext(AuthContext)
	//const { userData } = useContext(AuthContext)
	//console.log(userData)


// didac TO DO: evitar que aquellos usuarios que no sean administradores pueda acceder a '/user-administration'
	return (
		<StrictMode>
			<div className="container-fluid bg-dark">
				<div className="container">
					<Suspense fallback={<Spinner />}>
						<NavBar />
						<Router>
							<Page404 default />
							<Home path='/' />
							{ !isAuth && <NotRegisteredUser path='/login' /> }
							{ !isAuth && <Redirect from='/user-administration' to='/login' noThrow /> }
							{ !isAuth && <Redirect from='/user' to='/login' noThrow /> }

							{ isAuth && <Redirect from='/login' to='/' noThrow /> }
							<UserAdministration path='/user-administration' />
							<User path='/user' />
						</Router>
						<Footer />
					</Suspense>
				</div>
			</div>
		</StrictMode>
	)
}
