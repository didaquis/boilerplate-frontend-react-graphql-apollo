import React, { Component, Fragment } from 'react';

import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../gql/queries/clientes';

import FormularioEditarCliente from './FormularioEditarCliente';
import Spinner from '../spinner/Spinner';


class EditarCliente extends Component {

	render() {

		const { id } = this.props.match.params; // obtener el ID a partir de la URL

		return (
			<Fragment>
				<h2 className="text-center">Editar Cliente</h2>
				<Query
					query={CLIENTE_QUERY}
					variables={ { id } }
					pollInterval={200}
				>
					{({ loading, error, data, refetch }) => {
						if(loading) {
							return (
								<Spinner />
							);
						}
						if(error) return `Error: ${error.message}`;

						return (
							<FormularioEditarCliente
								cliente={data.getCliente}
								refetch={refetch}
							/>
						)
					}}
				</Query>
			</Fragment>
		);
	};
};

export default EditarCliente;
