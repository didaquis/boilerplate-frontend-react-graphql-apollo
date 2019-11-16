import React, { Fragment } from 'react'

import { PageTitle } from '../components/PageTitle'

import { UsersWithQuery } from '../containers/GetListOfUsers'

const UserAdministration = () => {
	return (
		<Fragment>
			<PageTitle text='User administration panel' />
			<UsersWithQuery />
		</Fragment>
	)
}

UserAdministration.displayName = 'UserAdministration'

export default UserAdministration
