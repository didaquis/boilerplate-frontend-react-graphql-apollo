import React, { StrictMode, useContext, Suspense } from 'react';

import { Router, Redirect } from '@reach/router';

import { AuthContext } from './AuthContext'

import { NotRegisteredUser } from './pages/NotRegisteredUser'
import { User } from './pages/User'
import { NotFound } from './pages/NotFound'

import { NavBar } from './components/NavBar'

const Home = React.lazy(() => import('./pages/Home'))


export const App = () => {
	const { isAuth } = useContext(AuthContext)
	//const { userData } = useContext(AuthContext)
	//console.log(userData)

	return (
		<StrictMode>
			<Suspense fallback={<div />}>
				<NavBar />
				<Router>
					<NotFound default />
					<Home path='/' />
					{ !isAuth && <NotRegisteredUser path='/login' /> }
					{ !isAuth && <Redirect from='/user' to='/login' noThrow /> }

					{ isAuth && <Redirect from='/login' to='/' noThrow /> }
					<User path='/user' />
				</Router>
			</Suspense>
		</StrictMode>
	)
}
