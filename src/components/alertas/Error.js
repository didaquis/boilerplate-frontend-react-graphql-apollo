import React from 'react';

const Error = ({mensaje}) => {
	if (mensaje.message) {
		mensaje = mensaje.message;
	}
	return (<p className="alert alert-danger py-3 text-center my-3">{mensaje}</p>);
};

export default Error;