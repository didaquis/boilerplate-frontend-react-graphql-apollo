import PropTypes from 'prop-types';

export const Jumbotron = ({ title, subtitle }) => (
	<div className="jumbotron">
		<h2 className="display-4 mb-4">{title}</h2>
		<p className="lead">{subtitle}</p>
	</div>
);

Jumbotron.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
};