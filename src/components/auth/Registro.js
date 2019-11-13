import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { NUEVO_USUARIO } from '../../gql/mutations/auth';

import Error from '../alertas/Error';

import { regexNombreUsuario, regexPassword } from '../../utils/utils';

const initialState = {
	usuario: '',
	password: '',
	repetirPassword: ''
}

class Registro extends Component {
	state = {
		...initialState
	}

	actualizarState = (e) => {
		const { name, value } = e.target;

		this.setState({
			[name] : value
		});
	}

	validarForm = () => {
		const { usuario, password, repetirPassword } = this.state;
		let validacionesFormularioCorrectas = false;

		if (!usuario || !password || !repetirPassword) {
			validacionesFormularioCorrectas = true;
		}

		if (password !== repetirPassword) {
			validacionesFormularioCorrectas = true;
		}

		if (!regexNombreUsuario.test(usuario)) {
			validacionesFormularioCorrectas = true;
		}

		if (!regexPassword.test(password)) {
			validacionesFormularioCorrectas = true;
		}

		if (!regexPassword.test(repetirPassword)) {
			validacionesFormularioCorrectas = true;
		}

		return validacionesFormularioCorrectas;
	}

	crearRegistro = (e, crearUsuario) => {
		e.preventDefault();

		crearUsuario().then(data => {
			this.limpiarState();
		});
	}

	limpiarState = () => {
		this.setState({...initialState});
		this.props.history.push('/login');
	}

	render() {

		const { usuario, password, repetirPassword } = this.state;

		return (
			<Fragment>
				<h2 className="text-center">Registrar nuevo usuario</h2>
				<div className="row justify-content-center mt-4">
					<Mutation
						mutation={NUEVO_USUARIO}
						variables={ { usuario, password} }
					>
						{(crearUsuario, { loading, error, data}) => {
							return (
								<form
									className="col-md-8"
									onSubmit={ e => this.crearRegistro(e, crearUsuario)}
								>
									{error && <Error mensaje={error} />}

									<div className="form-group">
										<label>Usuario <span className="text-danger">*</span></label>
										<input
											onChange={this.actualizarState}
											type="text"
											name="usuario"
											className="form-control"
											placeholder="Nombre Usuario"
											required
											autoFocus
											pattern="[A-Za-z0-9.\-_\*\/\|]{8,}"
											value={usuario}
										/>
										<small id="usuarioHelp" className="form-text text-muted">Mínimo 8 caracters. Los espacios no están permitidos</small>
									</div>
									<div className="form-group">
										<label>Password <span className="text-danger">*</span></label>
										<input
											onChange={this.actualizarState}
											type="password"
											name="password"
											className="form-control"
											placeholder="Password"
											required
											pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$"
											value={password}
										/>
										<small id="passwordHelp" className="form-text text-muted">Mínimo 8 caracters. Debe contener números, letras en minúscula y letras en mayúscula. Los espacios no están permitidos</small>
									</div>
									<div className="form-group">
										<label>Repetir Password <span className="text-danger">*</span></label>
										<input
											onChange={this.actualizarState}
											type="password"
											name="repetirPassword"
											className="form-control"
											placeholder="Repetir Password"
											required
											pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!*^?+-_@#$%&]{8,}$"
											value={repetirPassword}
										/>
										<small id="repetirPasswordHelp" className="form-text text-muted">Mínimo 8 caracters. Debe contener números, letras en minúscula y letras en mayúscula. Los espacios no están permitidos</small>
									</div>

									<button
										disabled={ loading || this.validarForm() }
										type="submit"
										className="btn btn-success float-right">
											Crear Usuario
									</button>
								</form>
							)
						}}
					</Mutation>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(Registro);