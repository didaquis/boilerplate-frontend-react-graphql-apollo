import gql from 'graphql-tag';

export const USUARIO_ACTUAL = gql`
query obtenerUsuario{
	obtenerUsuario{
		usuario
	}
}
`;
