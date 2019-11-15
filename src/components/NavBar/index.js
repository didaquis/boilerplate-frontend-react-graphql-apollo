import React from 'react'
import { Link } from '@reach/router'

import { MdHome, MdPersonOutline } from 'react-icons/md'

const SIZE = '32px'

export const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
			<Link className="navbar-brand text-light font-weight-bold" to='/'><MdHome size={SIZE}/></Link>
			<Link className="navbar-brand text-light font-weight-bold" to='/user'><MdPersonOutline size={SIZE}/></Link>
		</nav>
	)
}