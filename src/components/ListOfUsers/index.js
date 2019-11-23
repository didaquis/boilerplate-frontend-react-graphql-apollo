import React from 'react'
import PropTypes from 'prop-types'

import { parseUnixTimestamp } from '../../utils/utils'

export const ListOfUsers = ( { users = [] } ) => {
	return (
		<section className="table-responsive">
			<table className="table text-light">
  				<thead>
  					<tr>
						<th scope="col">Email</th>
						<th scope="col">Is administrator ?</th>
						<th scope="col">Is active ?</th>
						<th scope="col">Registration date</th>
						<th scope="col">Last login</th>
					</tr>
				</thead>
  				<tbody>
					{
						users.map(user => {
							return (
								<tr key={user.uuid}>
									<td>{user.email}</td>
									<td>{(user.isAdmin) ? 'yes': 'no'}</td>
									<td>{(user.isActive) ? 'yes': 'no'}</td>
									<td>{parseUnixTimestamp(user.registrationDate)}</td>
									<td>{parseUnixTimestamp(user.lastLogin)}</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</section>
	)
}


ListOfUsers.propTypes = {
	users: PropTypes.arrayOf(
		PropTypes.shape({
			email: PropTypes.string.isRequired,
			uuid: PropTypes.string.isRequired,
			isAdmin: PropTypes.bool.isRequired,
			isActive: PropTypes.bool.isRequired,
			registrationDate: PropTypes.string.isRequired,
			lastLogin: PropTypes.string.isRequired
		})
	)
}
