import React, { useContext } from 'react'
import { Link } from '@reach/router'

import { MdHome, MdPeopleOutline } from 'react-icons/md'
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

 import { AuthContext } from '../../AuthContext'

const SIZE = '36px'

export const NavBar = () => {
	const { isAuth } = useContext(AuthContext)

	return (
		<nav className="navbar navbar-expand-lg navbar-dark justify-content-between d-flex mb-5 border-bottom border-info">
			<Link className="navbar-brand text-light font-weight-bold pt-2" to='/'>
				<MdHome size={SIZE}/>
			</Link>
			<Link className="navbar-item text-light font-weight-bold pt-2" to='/user-administration'>
				<MdPeopleOutline size={SIZE}/>
			</Link>
			<Link className="navbar-item text-light font-weight-bold pt-2" to='/user'>
				{ !isAuth && <IoMdLogIn size={SIZE}/> }
				{ isAuth && <IoMdLogOut size={SIZE}/> }
			</Link>
		</nav>
	)
}