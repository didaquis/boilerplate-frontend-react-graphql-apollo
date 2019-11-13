import gql from 'graphql-tag';

export const PRODUCTOS_QUERY = gql`
query ObtenerProductos($limite: Int, $offset: Int, $hasStock: Boolean){
	obtenerProductos(limite: $limite, offset: $offset, hasStock: $hasStock){
		id
		nombre
		precio
		stock
	}
	totalProductos
}
`;

export const PRODUCTO_QUERY = gql`
query ObtenerProducto($id:ID!){
	obtenerProducto(id: $id) {
		id
		nombre
		precio
		stock
	}
}`;
