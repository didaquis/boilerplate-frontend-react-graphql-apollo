import { StrictMode, Suspense, lazy } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { Logout } from './pages/Logout';
import { Page404 } from './pages/Page404';

import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Spinner } from './components/Spinner';
import { RequireAuth } from './components/RequireAuth';
import { RequireUnauthenticated } from './components/RequireUnauthenticated';
import { RequireAdminRole } from './components/RequireAdminRole';

const Home = lazy(() => import('./pages/Home'));
const UserAdministration = lazy(() => import('./pages/UserAdministration'));


export const App = () => {
	return (
		<StrictMode>
			<div className="container-fluid bg-dark">
				<div className="container">
					<NavBar />
						<main className="pb-4">
							<Suspense fallback={<Spinner />}>
								<Routes>
									<Route path='/' element={<Home />} />
									<Route path="*" element={<Page404 />} />


									{
										// Routes for non-authenticated users
									}
									<Route path='/login' element={
										<RequireUnauthenticated>
											<Login />
										</RequireUnauthenticated>
									} />
									<Route path='/register' element={
										<RequireUnauthenticated>
											<Registration />
										</RequireUnauthenticated>
									} />


									{
										// Routes for authenticated users
									}
									<Route path='/logout' element={
										<RequireAuth>
											<Logout />
										</RequireAuth>
									} />


									{
										// Routes for authenticated administrator users
									}
									<Route path='/user-administration' element={
										<RequireAuth>
											<RequireAdminRole>
												<UserAdministration />
											</RequireAdminRole>
										</RequireAuth>
									} />
								</Routes>
							</Suspense>
						</main>
					<div className="row pb-5"></div>
					<Footer />
				</div>
			</div>
		</StrictMode>
	);
};
