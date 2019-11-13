import React, { Component, Fragment } from 'react';

import { Mutation } from 'react-apollo';
import { NUEVO_CLIENTE } from '../../gql/mutations/clientes';

class NuevoCliente extends Component {
	state = {
		cliente: {
			nombre: '',
			apellido: '',
			empresa: '',
			email: '',
			tipo: ''
		},
		error: false
	};

	render() {
		const { error } = this.state;
		let alertaValidaciones = (error) ? <p className="alert alert-danger p-3 text-center">Los campos "Nombre", "Email" y "Tipo Cliente" son obligatorios</p> : '';

		return (
			<Fragment>
				<h2 className="text-center">Nuevo Cliente</h2>

				{alertaValidaciones}

				<div className="row justify-content-center">
					<Mutation
						mutation={NUEVO_CLIENTE}
						onCompleted={ () => this.props.history.push('/clientes') }
					>
						{
							crearCliente => (
								<form className="col-md-8 m-3"
									onSubmit={ e => {
										e.preventDefault();
										const {nombre, apellido, empresa, email, tipo} = this.state.cliente;

										// validaciones
										if (nombre === '' || email === '' || tipo === '') {
											this.setState({error: true});
											return;
										}

										this.setState({error: false});

										const input = {
											nombre,
											apellido,
											empresa,
											email,
											tipo
										};

										crearCliente({
											variables: {input}
										})
									}}
								>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label>Nombre <span className="text-danger">*</span></label>
											<input
												type="text"
												className="form-control"
												placeholder="Nombre"
												required
												autoFocus
												onChange={ e => {
													this.setState({ cliente: {
														...this.state.cliente,
														nombre: e.target.value
													}})
												}}
											/>
										</div>
										<div className="form-group col-md-6">
											<label>Apellido</label>
											<input
												type="text"
												className="form-control"
												placeholder="Apellido"
												onChange={ e => {
													this.setState({ cliente: {
														...this.state.cliente,
														apellido: e.target.value
													}})
												}}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label>Empresa</label>
											<input
												type="text"
												className="form-control"
												placeholder="Empresa"
												onChange={ e => {
													this.setState({ cliente: {
														...this.state.cliente,
														empresa: e.target.value
													}})
												}}
											/>
										</div>
										<div className="form-group col-md-6">
											<label>Email <span className="text-danger">*</span></label>
											<input
												type="email"
												className="form-control"
												placeholder="Email"
												required
												onChange={ e => {
													this.setState({ cliente: {
														...this.state.cliente,
														email: e.target.value
													}})
												}}
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label>Tipo Cliente <span className="text-danger">*</span></label>
											<select
												onChange={ e => {
													this.setState({ cliente: {
														...this.state.cliente,
														tipo: e.target.value
													}})
												}}
												className="form-control"
												required
											>
												<option value="">Elegir...</option>
												<option value="BASICO">BÁSICO</option>
												<option value="PREMIUM">PREMIUM</option>
											</select>
										</div>
									</div>
									<button type="submit" className="btn btn-success float-right">Crear nuevo cliente</button>
								</form>
							)
						}


					</Mutation>
				</div>
			</Fragment>
		);
	};
};

export default NuevoCliente;
