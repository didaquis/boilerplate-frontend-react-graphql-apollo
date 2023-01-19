import { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

import { PageTitle } from '../components/PageTitle';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {

	const { activateAuth } = useContext(AuthContext);

	return (
		<Fragment>
			<PageTitle text='Log in' />
			<LoginForm activateAuth={activateAuth} />
			<Link className="text-light font-weight-light" to='/register'>
				Don't have an account? <span role="img" aria-label="Winking Face">😉</span>
			</Link>
		</Fragment>
	);
};