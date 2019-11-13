import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { PRODUCTOS_QUERY } from '../../gql/queries/productos';
import { ELIMINAR_PRODUCTO } from '../../gql/mutations/productos';
import Spinner from '../spinner/Spinner';


import Paginador from '../Paginador';
import Exito from '../alertas/Exito';
import Info from '../alertas/Info';


class Productos extends Component {

	limiteRegistrosVisibles = 10;

	state = {
		paginador: {
			actual: 1,
			offset: 0
		},
		alerta: {
			mostrar: false,
			mensaje: ''
		}
	}

	paginaAnterior = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset - this.limiteRegistrosVisibles,
				actual: this.state.paginador.actual - 1
			}
		})
	}

	paginaSiguiente = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset + this.limiteRegistrosVisibles,
				actual: this.state.paginador.actual + 1
			}
		})
	}

	render() {

		const { alerta: { mostrar, mensaje } } = this.state;

		const alerta = (mostrar) ? <Exito mensaje={mensaje} /> : '';

		return (
			<Query
				query={PRODUCTOS_QUERY}
				pollInterval={200}
				variables={{limite: this.limiteRegistrosVisibles, offset: this.state.paginador.offset}}
			>
				{ ({ loading, error, data, startPolling, stopPolling }) => {
					if(loading) {
						return (
							<Spinner />
						);
					}
					if(error) return `Error: ${error.message}`;

					if (!data.obtenerProductos.length) {
						const mensaje = 'No hay productos registrados';
						return (
							<Fragment>
								<h2 className="text-center">Listado de productos</h2>
								<div className="mx-auto mt-4">
									<Info mensaje={mensaje} />
								</div>
							</Fragment>
						);
					} else {
						return (
							<Fragment>
								<h2 className="text-center">Listado de productos</h2>
								{alerta}
								<table className="table mt-4">
									<thead>
										<tr className="table-primary">
											<th scope="col">Nombre</th>
											<th scope="col">Precio</th>
											<th scope="col">Stock</th>
											<th scope="col">Eliminar</th>
											<th scope="col">Editar</th>
										</tr>
									</thead>
									<tbody>
										{
											data.obtenerProductos.map((producto) => {
												const { id, stock } = producto;

												let clase = '';
												if (stock < 100) {
													clase = 'table-warning';
												}
												if (stock < 1) {
													clase = 'table-danger';
												}

												return (
													<tr key={producto.id} className={clase}>
														<td>{producto.nombre}</td>
														<td>{producto.precio}</td>
														<td>{producto.stock}</td>
														<td>
															<Mutation
																mutation={ELIMINAR_PRODUCTO}
																onCompleted={(data) => {
																	this.setState({
																		alerta: {
																			mostrar: true,
																			mensaje: data.eliminarProducto
																		}
																	}, () => {
																		setTimeout(() => {
																			this.setState({
																				alerta: {
																					mostrar: false,
																					mensaje: ''
																				}
																			})
																		}, 3000)
																	})
																}}
															>
																{ eliminarProducto => (
																	<button
																		type="button"
																		className="btn btn-danger d-block d-md-inline-block mr-2"
																		onClick={ () => {
																			const message = '¿Seguro que quieres eliminar el producto?';
																			if (window.confirm(message)) {
																				eliminarProducto({
																					variables: { id }
																				})
																			}
																		} }
																	>
																		&times; Eliminar producto
																	</button>
																) }
															</Mutation>
														</td>
														<td>
															<Link to={`/producto/editar/${producto.id}`} className="btn btn-success d-block d-md-inline-block">
																Editar producto
															</Link>
														</td>
												</tr>)
											})
										}
									</tbody>
								</table>
								<Paginador
									actual={this.state.paginador.actual}
									totalRegistros={data.totalProductos}
									limiteRegistrosVisibles={this.limiteRegistrosVisibles}
									paginaAnterior={this.paginaAnterior}
									paginaSiguiente={this.paginaSiguiente}
								/>
							</Fragment>
						)
					}

				} }
			</Query>
		);
	}
}

export default Productos;
