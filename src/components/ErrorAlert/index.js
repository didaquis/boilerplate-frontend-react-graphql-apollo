import React from 'react'

export const ErrorAlert = ( {errorMessage = ''} ) => (
	<p className="alert alert-danger py-3 text-center my-5">{errorMessage}</p>
)
