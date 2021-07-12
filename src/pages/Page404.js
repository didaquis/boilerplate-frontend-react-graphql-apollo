import { Fragment } from 'react';

import { ErrorAlert } from '../components/ErrorAlert';

export const Page404 = () => {
	return (
		<Fragment>
			<ErrorAlert errorMessage='404' />
		</Fragment>
	);
};