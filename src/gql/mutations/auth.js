import gql from 'graphql-tag';

export const NUEVO_USUARIO = gql`
	mutation crearUsuario($usuario: String!, $password: String!) {
		crearUsuario(usuario: $usuario, password: $password)
	}
`;

export const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($usuario: String!, $password: String!) {
		autenticarUsuario(usuario: $usuario, password: $password) {
			token
		}
	}
`;