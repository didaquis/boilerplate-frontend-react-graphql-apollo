import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { CLIENTE_QUERY } from '../../gql/queries/clientes';

import Spinner from '../spinner/Spinner';


const DatosCliente = ({ id }) => {
	return(
		<Fragment>
			<h3 className="text-center mb-3">Resumen del cliente</h3>
			<Query
				query={CLIENTE_QUERY}
				variables={{ id }}
				pollInterval={200}
			>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if(loading) {
						return (
							<Spinner />
						);
					}
					if(error) return `Error: ${error.message}`;

					const { nombre, apellido, email, empresa, tipo } = data.getCliente;

					return (
						<ul className="list-unstyled my-5">
							<li className="border font-weight-bold p-2">Nombre:
								<br/>
								<span className="font-weight-normal pl-1">{nombre}</span>
							</li>
							<li className="border font-weight-bold p-2">Apellido:
								<br/>
								<span className="font-weight-normal pl-1">{apellido}</span>
							</li>
							<li className="border font-weight-bold p-2">Empresa:
								<br/>
								<span className="font-weight-normal pl-1">{empresa}</span>
							</li>
							<li className="border font-weight-bold p-2">Email:
								<br/>
								<span className="font-weight-normal pl-1">{email}</span>
							</li>
							<li className="border font-weight-bold p-2">Tipo:
								<br/>
								<span className="font-weight-normal pl-1">{tipo}</span>
							</li>
						</ul>
					);
				}}
			</Query>
		</Fragment>
	);
}

export default DatosCliente;
