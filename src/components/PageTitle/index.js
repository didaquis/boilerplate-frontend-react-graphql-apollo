import PropTypes from 'prop-types';

export const PageTitle = ( { text } ) => <h2 className="mb-3 font-weight-light text-light">{text}</h2>;

PageTitle.propTypes = {
	text: PropTypes.string.isRequired
};