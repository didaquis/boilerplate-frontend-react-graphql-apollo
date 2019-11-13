import gql from 'graphql-tag';

export const OBTENER_PEDIDOS = gql`
query ObtenerPedidos($clienteId: String!){
	obtenerPedidos(clienteId: $clienteId){
		id
		total
		fecha
		estado
		pedido {
			id
			nombre
			cantidad
			precio
		}
	}
}
`;

