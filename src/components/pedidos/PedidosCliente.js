import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { OBTENER_PEDIDOS } from '../../gql/queries/pedidos';

import Spinner from '../spinner/Spinner';
import Info from '../alertas/Info';
import Pedido from './Pedido';


const PedidosCliente = (props) => {

		const clienteId = props.match.params.id;

		return(
			<Fragment>
				<h2 className="text-center">Pedidos del Cliente</h2>
				<div className="row">
					<Query
						query={OBTENER_PEDIDOS}
						variables={ { clienteId } }
						pollInterval={200}
					>
						{({ loading, error, data, startPolling, stopPolling }) => {
							if(loading) {
								return (
									<Spinner />
								);
							}

							if(error) return `Error: ${error.message}`;

							if (data.obtenerPedidos.length) {
								return (
									data.obtenerPedidos.map(pedido => {
										return (<Pedido 
											key={pedido.id}
											pedido={pedido}
											clienteId={clienteId}
										/>);
									})
								);
							} else {
								const mensaje = 'Este cliente todavía no ha realizado ningún pedido';
								return (
									<div className="mx-auto mt-4">
										<Info mensaje={mensaje} />
									</div>
								);
							}

						}}
					</Query>
				</div>
			</Fragment>
		);
}

export default PedidosCliente;
