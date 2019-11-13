import gql from 'graphql-tag';

export const NUEVO_PRODUCTO = gql`
	mutation nuevoProducto($input: ProductoInput) {
		nuevoProducto(input: $input) {
			id
			nombre
			precio
			stock
		}
	}
`;

export const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($input: ProductoInput) {
		actualizarProducto(input: $input) {
			id
			nombre
			precio
			stock
		}
	}
`;

export const ELIMINAR_PRODUCTO = gql`
	mutation eliminarProducto($id: ID!) {
		eliminarProducto(id: $id)
	}
`;