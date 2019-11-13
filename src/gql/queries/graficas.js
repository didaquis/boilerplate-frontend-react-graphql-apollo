import gql from 'graphql-tag';

export const TOP_CLIENTES = gql`
query topClientes {
	topClientes {
		total
		cliente {
			nombre
		}
	}
}
`;