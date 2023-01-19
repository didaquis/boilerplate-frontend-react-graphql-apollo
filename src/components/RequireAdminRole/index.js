import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../AuthContext';

export const RequireAdminRole = ({ children }) => {
	const { userData } = useContext(AuthContext);

	if (!userData.isAdmin) {
		return <Navigate to="/" />;
	}

	return children;
};
