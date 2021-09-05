import { useContext, useEffect, Fragment } from 'react';
import { AuthContext } from '../AuthContext';

import { SubmitButton } from '../components/SubmitButton';
import { PageTitle } from '../components/PageTitle';

export const Logout = () => {
	const { removeAuth } = useContext(AuthContext);

	useEffect(() => {
		/* Closing the session after the render of the view */
		removeAuth();
	}, [removeAuth] );

	return (
		<Fragment>
			<PageTitle text='Log out' />
			<div className="mt-5">
				<SubmitButton onClick={removeAuth}>Close session</SubmitButton>
			</div>
		</Fragment>
	);
};