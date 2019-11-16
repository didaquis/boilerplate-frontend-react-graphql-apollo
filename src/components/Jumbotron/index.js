import React from 'react';

export const Jumbotron = (props) => (
	<div className="jumbotron">
		<h2 className="display-4 mb-4">{props.title}</h2>
		<p className="lead">{props.subtitle}</p>
	</div>
)