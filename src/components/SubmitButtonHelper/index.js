import React from 'react';
import PropTypes from 'prop-types';

export const SubmitButtonHelper = ( { mustShowHelper } ) => {
	return (mustShowHelper) ? <small id="submitHelp" className="form-text text-muted">Submit is disabled until valid data is entered in the form</small> : null;
};

SubmitButtonHelper.propTypes = {
	mustShowHelper: PropTypes.bool.isRequired
};