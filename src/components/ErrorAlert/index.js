import React from 'react';
import PropTypes from 'prop-types';

export const ErrorAlert = ( { errorMessage } ) => (
	<p className="alert alert-danger py-3 text-center my-5" role="alert">{errorMessage}</p>
);

ErrorAlert.propTypes = {
	errorMessage: PropTypes.string.isRequired
};