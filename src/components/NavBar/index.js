import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { BsHouse, BsPeople, BsBoxArrowInRight, BsBoxArrowRight } from 'react-icons/bs';

 import { AuthContext } from '../../AuthContext';

const SIZE = '32px';

export const NavBar = () => {
	const { isAuth } = useContext(AuthContext);
	const { userData } = useContext(AuthContext);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark justify-content-between d-flex mb-5 border-bottom border-info">
			<Link className="navbar-item text-light font-weight-bold pt-2" to='/'>
				<BsHouse size={SIZE} title='Home'/>
			</Link>
			{ 
				isAuth && userData.isAdmin && <Link className="navbar-item text-light font-weight-bold pt-2" to='/user-administration'>
					<BsPeople size={SIZE} title='User administration'/>
				</Link>
			}
			<Link className="navbar-item text-light font-weight-bold pt-2" to='/logout'>
				{ !isAuth && <BsBoxArrowInRight size={SIZE} title='Login'/> }
				{ isAuth && <BsBoxArrowRight size={SIZE} title='Logout'/> }
			</Link>
		</nav>
	);
};