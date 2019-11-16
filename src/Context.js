import React, { createContext, useState } from 'react'

import { saveSession, recoverSession, deleteSession } from './utils/utils'

export const Context = createContext()

const Provider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => {
		return recoverSession('token')
	})

	const value = {
		isAuth, 
		activateAuth: (token) => {
			setIsAuth(true)
			saveSession('token', token)
		},
		removeAuth: () => {
			setIsAuth(false)
			deleteSession()
		}
	}

	return (
		<Context.Provider value={value}>
			{children}
		</Context.Provider>
	)
}

export default {
	Provider, 
	Consumer: Context.Consumer
}