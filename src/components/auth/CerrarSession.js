import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { deleteSession } from '../../utils/utils';

const cerrarSesionUsuario = (apolloClient, history) => {
	deleteSession();
	apolloClient.resetStore();
	history.push('/login');
};

const CerrarSession = ({ history }) => (
	<ApolloConsumer>
		{ apolloClient => {
			return (
				<button
					onClick={ () => cerrarSesionUsuario(apolloClient, history) }
					className="btn btn-light ml-md-2 mt-2 mt-md-0">
						Cerrar Sesión
				</button>
			);
		} }
	</ApolloConsumer>
);

export default withRouter(CerrarSession);
