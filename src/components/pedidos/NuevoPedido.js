import React, { Component, Fragment } from 'react';

import { Query } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../gql/queries/productos';

import DatosCliente from './DatosCliente';
import ContenidoPedido from './ContenidoPedido';
import Spinner from '../spinner/Spinner';


class NuevoPedido extends Component {
	state = {

	}

	render() {

		const { id } = this.props.match.params;

		return(
			<Fragment>
				<h2 className="text-center">Nuevo pedido</h2>

				<div className="row mt-4">
					<div className="col-md-3">
						<DatosCliente
							id={id}
						/>
					</div>
					<div className="col-md-9">
						<Query
							query={PRODUCTOS_QUERY}
							variables={ { hasStock: true } }
							pollInterval={200}
						>
						{({ loading, error, data }) => {
							if(loading) {
								return (
									<Spinner />
								);
							}
							if(error) return `Error: ${error.message}`;

							return (
								<ContenidoPedido
									productos={data.obtenerProductos}
									idCliente={id}
								/ >
							)
						}}
						</Query>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default NuevoPedido;
