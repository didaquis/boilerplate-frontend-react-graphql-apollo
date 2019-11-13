import gql from 'graphql-tag';

export const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input: PedidoInput) {
		nuevoPedido(input: $input) {
			id
		}
	}
`;

export const ACTUALIZAR_ESTADO = gql`
	mutation actualizarEstado($input: PedidoInput!) {
		actualizarEstado(input: $input)
	}
`;