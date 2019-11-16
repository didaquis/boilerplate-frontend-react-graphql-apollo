import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'

import { SubmitButton } from '../components/SubmitButton'

export const User = () => {
	const { removeAuth } = useContext(AuthContext)
	return (
		<SubmitButton onClick={removeAuth}>Close session</SubmitButton>
	)
}