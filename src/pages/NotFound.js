import React, { Fragment } from 'react'

import { ErrorAlert } from '../components/ErrorAlert'

export const NotFound = () => {
	return (
		<Fragment>
			<ErrorAlert errorMessage={'404'} />
		</Fragment>
	)
}