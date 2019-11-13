import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { AUTENTICAR_USUARIO } from '../../gql/mutations/auth';

import Error from '../alertas/Error';

import { regexNombreUsuario, regexPassword, saveSession } from '../../utils/utils';

const initialState = {
    usuario : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

    actualizarState = e => {
        const { name, value } = e.target;

        this.setState({
            [name] : value
        })
    }


    limpiarState = () => {
        this.setState({...initialState});
    }

    iniciarSesion = (e, usuarioAutenticar) => {
		e.preventDefault();

		usuarioAutenticar().then(async ({data}) => {
			saveSession('token', data.autenticarUsuario.token);

			await this.props.refetch();

			this.limpiarState();

			this.props.history.push('/estadisticas');
		});
    }

    validarForm = () => {
        const { usuario, password } = this.state;
		let validacionesFormularioCorrectas = false;

		if (!usuario || !password) {
			validacionesFormularioCorrectas = true;
		}

		if (!regexNombreUsuario.test(usuario)) {
			validacionesFormularioCorrectas = true;
		}

		if (!regexPassword.test(password)) {
			validacionesFormularioCorrectas = true;
		}

        return validacionesFormularioCorrectas;
	}

    render() {

        const { usuario, password } = this.state;

        return (
            <Fragment>
                <h2 className="text-center">Acceder</h2>
                <div className="row justify-content-center mt-4">
                    <Mutation
                        mutation={AUTENTICAR_USUARIO}
                        variables={{usuario, password}}
                    >
						{( usuarioAutenticar, {loading, error, data}) => {
							return (
								<form
									onSubmit={ e => this.iniciarSesion(e, usuarioAutenticar) }
									className="col-md-8"
								>
									{error && <Error mensaje={error} />}

									<div className="form-group">
										<label>Usuario <span className="text-danger">*</span></label>
										<input
											onChange={this.actualizarState}
											value={usuario}
											type="text"
											name="usuario"
											className="form-control"
											placeholder="Nombre Usuario"
											required
											autoFocus
										/>
										<small id="usuarioHelp" className="form-text text-muted">Mínimo 8 caracters. Los espacios no están permitidos</small>
									</div>
									<div className="form-group">
										<label>Password <span className="text-danger">*</span></label>
										<input
											onChange={this.actualizarState}
											value={password}
											type="password"
											name="password"
											className="form-control"
											placeholder="Password"
											required
										/>
										<small id="passwordHelp" className="form-text text-muted">Mínimo 8 caracters. Debe contener números, letras en minúscula y letras en mayúscula. Los espacios no están permitidos</small>
									</div>

									<button
										disabled={
											loading || this.validarForm()
										}
										type="submit"
										className="btn btn-success float-right">
											Iniciar Sesión
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

export default withRouter(Login);