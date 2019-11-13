import React, { Component, Fragment } from 'react';

import { Mutation } from 'react-apollo';
import { NUEVO_PRODUCTO } from '../../gql/mutations/productos';


const initialState = {
	nombre: '',
	precio: '',
	stock: ''
}

class NuevoProducto extends Component {
	state = {
		...initialState
	}

	limpiarState = () => {
		this.setState({
			...initialState
		});
	}

	actualizarState = e => {
		const { name, value } = e.target;

		this.setState({
			[name]: value
		});
	}

	validarForm = () => {
		const { nombre, precio, stock } = this.state;
		const noValido = !nombre || !precio || !stock;

		return noValido;
	}

	crearNuevoProducto = (e, cb) => {
		e.preventDefault();

		cb().then(data => {
			this.limpiarState();
		}).then(() => {
			this.props.history.push('/productos');
		});
	}

	render(){

		const { nombre, precio, stock } = this.state;

		const input = {
			nombre,
			precio: Number(precio),
			stock: Number(stock)
		};

		return(
			<Fragment>
				<h2 className="text-center">Nuevo Producto</h2>
				<div className="row justify-content-center">
					<Mutation
						mutation={NUEVO_PRODUCTO}
						variables={{ input }}
					>
					{(nuevoProducto, {loading, error, data}) => {
						return(
							<form className="col-md-8" onSubmit={ e => this.crearNuevoProducto(e, nuevoProducto)}>
								<div className="form-group">
									<label>Nombre <span className="text-danger">*</span></label>
									<input
										type="text"
										name="nombre"
										className="form-control"
										placeholder="Nombre del Producto"
										onChange={this.actualizarState}
									/>
								</div>
								<div className="form-group">
									<label>Precio <span className="text-danger">*</span></label>
									<div className="input-group">
										<div className="input-group-prepend">
											<div className="input-group-text">$</div>
										</div>
										<input
											type="number"
											name="precio"
											className="form-control"
											placeholder="Precio del Producto"
											onChange={this.actualizarState}
										/>
									</div>
								</div>
								<div className="form-group">
									<label>Stock <span className="text-danger">*</span></label>
									<input
										type="number"
										name="stock"
										className="form-control"
										placeholder="Stock del Producto"
										onChange={this.actualizarState}
									/>
								</div>
								<button
									disabled={this.validarForm()}
									type="submit"
									className="btn btn-success float-right">
										Crear Producto
								</button>
							</form>
						);
					}}
					</Mutation>
				</div>
			</Fragment>
		);
	}

}

export default NuevoProducto;
