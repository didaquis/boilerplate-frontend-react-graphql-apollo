import React, { useContext } from 'react'
import { Context } from '../Context'

import { SubmitButton } from '../components/SubmitButton'

export const User = () => {
	const { removeAuth } = useContext(Context)
	return (
		<SubmitButton onClick={removeAuth}>Cerrar sesión</SubmitButton>
	)
}