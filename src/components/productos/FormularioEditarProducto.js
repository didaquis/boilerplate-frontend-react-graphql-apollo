import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';


import { Mutation } from 'react-apollo';
import { ACTUALIZAR_PRODUCTO } from '../../gql/mutations/productos';


class FormularioEditarProducto extends Component {
    state =  {
        ...this.props.producto,
    };

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


    render() {

        const { id, nombre, precio, stock } = this.state;

        const input = {
            id,
            nombre,
            precio: Number(precio),
            stock: Number(stock)
        };

        return (
            <Fragment>
                <div className="row justify-content-center">
                    <Mutation
                        mutation={ACTUALIZAR_PRODUCTO}
                        onCompleted={ () => this.props.refetch().then(() => {
                            this.props.history.push('/productos');
                        }) }
                    >
                        {
                            actualizarProducto => (

                                <form className="col-md-8 m-3" onSubmit={ e => {
                                    e.preventDefault();

                                    const {id, nombre, precio, stock} = this.state;

                                    const input = {
                                        id,
                                        nombre,
                                        precio: Number(precio),
                                        stock: Number(stock)
                                    };

                                    actualizarProducto({
                                        variables: {input}
                                    })
                                }}>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Nombre <span className="text-danger">*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="nombre"
                                                required
                                                autoFocus
                                                defaultValue={nombre}
                                                placeholder="Nombre del Producto"
                                                onChange={this.actualizarState}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Precio <span className="text-danger">*</span></label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text">$</div>
                                            </div>
                                            <input
                                                onChange={this.actualizarState}
                                                type="number"
                                                name="precio"
                                                required
                                                className="form-control"
                                                value={precio}
                                                placeholder="Precio del Producto"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Stock <span className="text-danger">*</span></label>
                                        <input
                                            onChange={this.actualizarState}
                                            type="number"
                                            name="stock"
                                            required
                                            className="form-control"
                                            value={stock}
                                            placeholder="Stock del Producto"
                                        />
                                    </div>
                                    <button
                                        disabled={this.validarForm()}
                                        type="submit"
                                        className="btn btn-success float-right">
                                            Guardar Cambios
                                    </button>
                                </form>
                            )
                        }
                    </Mutation>
                </div>
            </Fragment>
        )
    };
};

export default withRouter(FormularioEditarProducto);
