import React, { Fragment } from 'react';


const Producto = (props) => {

	const { producto } = props;

	return (
		<Fragment>
			<tr>
				<td>{producto.nombre}</td>
				<td>{producto.precio} $</td>
				<td>{producto.stock}</td>
				<td>
					<input
						type="number"
						className="form-control"
						min="0"
						max={producto.stock}
						step="1"
						onChange={ (e) => {
							if (e.target.value > producto.stock || e.target.value < 0) {
								e.target.value = 0;
							}
							props.actualizarCantidad(e.target.value, props.index)
						}}
						defaultValue={producto.cantidad || 0}
					/>
				</td>
				<td>
					<button
						type="button"
						className="btn btn-danger font-weight-bold"
						onClick={e => props.eliminarProducto(producto.id)}
					>&times; Eliminar</button>
				</td>
			</tr>
		</Fragment>
	);
}

export default Producto;