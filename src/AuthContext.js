import { createContext, useState } from 'react';

import jwt from 'jsonwebtoken';

import { saveSession, recoverSession, deleteSession, storeUserDataOnSessionStorage, recoverUserDataFromSessionStorage, deleteUserDataFromSessionStorage } from './utils/session';

export const AuthContext = createContext();

const Provider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => {
		return recoverSession('token');
	});

	const [userData, setUserData] = useState(() => {
		return recoverUserDataFromSessionStorage();
	});

	const value = {
		isAuth,
		userData,
		activateAuth: (token) => {
			const decodedToken = jwt.decode(token) || {};
			const userData = {
				email: decodedToken.email,
				isAdmin: decodedToken.isAdmin,
				isActive: decodedToken.isActive,
				uuid: decodedToken.uuid
			};
			storeUserDataOnSessionStorage(userData);
			setUserData(userData);
			saveSession('token', token);
			setIsAuth(true);
		},
		removeAuth: () => {
			setIsAuth(false);
			setUserData({});
			deleteUserDataFromSessionStorage();
			deleteSession();
		}
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { Provider, Consumer: AuthContext.Consumer };
