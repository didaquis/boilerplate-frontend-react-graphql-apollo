import React, { createContext, useState } from 'react'

//import jwt from 'jsonwebtoken';

import { saveSession, recoverSession, deleteSession } from './utils/utils'

export const AuthContext = createContext()

const Provider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => {
		return recoverSession('token')
	})

	// const [userData, setUserData] = useState(() => {
	// 	const token = recoverSession('token')
	// 	const decodedToken = jwt.decode(token) || {};
	// 	//console.log('deco', decodedToken)
	// 	const userData = {
	// 		email: decodedToken.email,
	// 		isAdmin: decodedToken.isAdmin,
	// 		isActive: decodedToken.isActive,
	// 		uuid: decodedToken.uuid
	// 	}
	// 	return userData
	// })


	const value = {
		isAuth,
		//userData,
		activateAuth: (token) => {
			saveSession('token', token)
			// setUserData({})
			setIsAuth(true)
		},
		removeAuth: () => {
			//setUserData({})
			setIsAuth(false)
			deleteSession()
		}
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export default { Provider, Consumer: AuthContext.Consumer }
