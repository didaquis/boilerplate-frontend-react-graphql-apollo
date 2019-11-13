import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
query getClientes($limite: Int, $offset: Int){
	getClientes(limite: $limite, offset: $offset){
		id
		nombre
		apellido
		empresa
		email
	}
	totalClientes
}
`;

export const CLIENTE_QUERY = gql`
query ObtenerCliente($id:ID!){
	getCliente(id: $id) {
		id
		nombre
		apellido
		empresa
		email
		tipo
	}
}`;
