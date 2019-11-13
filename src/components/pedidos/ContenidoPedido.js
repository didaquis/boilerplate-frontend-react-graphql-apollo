import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import Animated from 'react-select/lib/animated';


import Resumen from './Resumen';
import GenerarPedido from './GenerarPedido';
import Error from '../alertas/Error';
import Info from '../alertas/Info';


class ContenidoPedido extends Component {
	state = {
		productos: [],
		total: 0
	}

	seleccionarProducto = (productos) => {
		this.setState({ productos }, () => this.actualizarTotal());
	}

	actualizarTotal = () => {
		const productos = this.state.productos;
		let nuevoValorTotal = 0;

		if (productos.length !== 0) {
			productos.map(producto => {
				const cantidad = producto.cantidad || 0;
				return nuevoValorTotal += (cantidad * producto.precio)
			});
		}

		this.setState({
			total: nuevoValorTotal
		});
	}

	actualizarCantidad = (cantidad, index) => {
		const productos = this.state.productos;

		productos[index].cantidad = Number(cantidad);

		this.setState({ productos }, () => this.actualizarTotal());
	}

	eliminarProducto = (id) => {
		const productos = this.state.productos;

		const productosRestantes = productos.filter(producto => producto.id !== id);
		this.setState({ productos: productosRestantes }, () => this.actualizarTotal());
	}

	render() {

		const mensaje = (this.state.total < 0) ? <Error mensaje="Las cantidades no pueden ser negativas" /> : '';

		if (!this.props.productos.length) {
			const mensaje = 'No hay productos registrados, o bien no dispone de stock';
			return (
					<Fragment>
						<h3 className="text-center mb-5">Seleccionar artículos</h3>
						<div className="mx-auto">
							<Info mensaje={mensaje} />
						</div>
					</Fragment>
				)
		} else {
			return(
				<Fragment>
					<h3 className="text-center mb-5">Seleccionar artículos</h3>
					{mensaje}
					<Select
						onChange={this.seleccionarProducto}
						options={this.props.productos}
						isMulti={true}
						components={ Animated() }
						placeholder="Seleccionar productos"
						getOptionValue={ (options) => options.id }
						getOptionLabel={ (options) => options.nombre }
						value={this.state.productos}
					/>

					<Resumen
						productos={this.state.productos}
						actualizarCantidad={this.actualizarCantidad}
						eliminarProducto={this.eliminarProducto}
					/>

					<p className="font-weight-bold float-right mt-3">
						Total:
						<span className="font-weight-normal ml-1">
							{this.state.total} $
						</span>
					</p>

					<GenerarPedido
						productos={this.state.productos}
						total={this.state.total}
						idCliente={this.props.idCliente}
					/>
				</Fragment>
			);
		}
	}
}

export default ContenidoPedido;
