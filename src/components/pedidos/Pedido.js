import React from 'react';

import { Mutation } from 'react-apollo';
import { ACTUALIZAR_ESTADO } from '../../gql/mutations/pedidos';

import ResumenProducto from './ResumenProducto';
import './Pedido.css';

const Pedido = (props) => {

	const { pedido, clienteId } = props;
	const fecha = new Date(Number(pedido.fecha));
	const estadoPedido = pedido.estado;

	let borderColorPorEstadoPedido;
	switch (estadoPedido) {
		case 'PENDIENTE':
			borderColorPorEstadoPedido = 'border-light';
			break;
		case 'CANCELADO':
			borderColorPorEstadoPedido = 'border-danger';
			break;
		case 'COMPLETADO':
			borderColorPorEstadoPedido = 'border-success';
			break;
		default:
			borderColorPorEstadoPedido = '';
	}

	return (
		<div className="col-md-4 mt-4">
			<div className={`card mb-3 customStyles__border--wide ${borderColorPorEstadoPedido}`}>
				<div className="card-body">
					<p className="card-text font-weight-bold">Estado:
						<Mutation mutation={ACTUALIZAR_ESTADO}>
							{actualizarEstado => (
									<select
										className="form-control my-3"
										value={pedido.estado}
										onChange={e => {
											const input = {
												id: pedido.id,
												pedido: pedido.pedido,
												total: pedido.total,
												fecha: pedido.fecha,
												cliente: clienteId,
												estado : e.target.value
											}

											actualizarEstado({ variables: { input } });
										}}
									>
										<option value="PENDIENTE">PENDIENTE</option>
										<option value="COMPLETADO">COMPLETADO</option>
										<option value="CANCELADO">CANCELADO</option>
									</select>
								)
							}
						</Mutation>
					</p>
					<p className="card-text font-weight-bold">Pedido ID:
						<span className="font-weight-normal"> {pedido.id}</span>
					</p>
					<p className="card-text font-weight-bold">Fecha Pedido:
						<span className="font-weight-normal"> {fecha.toLocaleString('es-ES')}</span>
					</p>
					<p className="card-text font-weight-bold">Total:
						<span className="font-weight-normal"> {pedido.total} $</span>
					</p>

					<h3 className="card-text text-center mb-3">Artículos del pedido</h3>
					{pedido.pedido.map((producto, index) => {
						return (
							<ResumenProducto
								nombre={producto.nombre}
								cantidad={producto.cantidad}
								precio={producto.precio}
								key={producto.id}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Pedido;
