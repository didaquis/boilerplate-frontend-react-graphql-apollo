import React from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { NUEVO_PEDIDO } from '../../gql/mutations/pedidos';


const validarPedido = (props) => {
	return !props.productos || props.total <= 0;
}

const GenerarPedido = (props) => {

	return (
		<Mutation
			mutation={NUEVO_PEDIDO}
			onCompleted={ () => props.history.push('/clientes') }
		>
			{nuevoPedido => {
				return (
					<button
						disabled={validarPedido(props)}
						type="button"
						className="btn btn-warning font-weight-bold mt-4"
						onClick={e => {
							const productosInput = props.productos.map(({stock, ...objeto}) => objeto);

							const input = {
								pedido: productosInput,
								total: props.total,
								cliente: props.idCliente
							};

							nuevoPedido({variables: { input }});
						}}
					>Generar Pedido</button>
				)
			}}
		</Mutation>
	);
}

export default withRouter(GenerarPedido);
