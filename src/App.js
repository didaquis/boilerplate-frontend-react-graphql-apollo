import React, { StrictMode, Fragment } from 'react';
import { BrowserRouter as BwsRouter, Route, Switch } from 'react-router-dom';

import Navbar 			from './components/layout/Navbar';
import Home 			from './components/layout/Home';
import Clientes 		from './components/clientes/Clientes';
import EditarCliente 	from './components/clientes/EditarCliente';
import NuevoCliente 	from './components/clientes/NuevoCliente';
import Productos 		from './components/productos/Productos';
import EditarProducto 	from './components/productos/EditarProducto';
import NuevoProducto 	from './components/productos/NuevoProducto';
import NuevoPedido 		from './components/pedidos/NuevoPedido';
import PedidosCliente 	from './components/pedidos/PedidosCliente';
import Estadisticas 	from './components/estadisticas/Estadisticas';
import Registro 		from './components/auth/Registro';
import Login 			from './components/auth/Login';
import Session 			from './components/auth/Session';
import PrivateRoute 	from './components/auth/PrivateRoute';
import Error404 		from './components/Error404';


const App = ({ refetch, session }) => {

	const { obtenerUsuario } = session;

	return (
		<BwsRouter>
			<StrictMode>
				<Navbar session={session} />
				<div className="container">
					<Switch>
						<Route
							exact path="/"
							component={Home} />
						<PrivateRoute
							exact path="/estadisticas"
							component={Estadisticas}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/clientes"
							component={Clientes}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/cliente/nuevo"
							component={NuevoCliente}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/cliente/editar/:id"
							component={EditarCliente}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/productos"
							component={Productos}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/producto/nuevo"
							component={NuevoProducto}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/producto/editar/:id"
							component={EditarProducto}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/pedido/nuevo/:id"
							component={NuevoPedido}
							usuarioAutenticado={obtenerUsuario} />
						<PrivateRoute
							exact path="/pedido/:id"
							component={PedidosCliente}
							usuarioAutenticado={obtenerUsuario} />

						{
							(obtenerUsuario) ?
								<Fragment>
									<Route
										exact path={['/registro', '/login']}
										component={Home}
									/>
									<Route component={Error404} />
								</Fragment>
							:
							<Fragment>
								<Route
									exact path="/registro"
									component={Registro} />
								<Route
									exact path="/login"
									render={() => <Login refetch={refetch} />} />
								<Route component={Error404} />
							</Fragment>
						}

					</Switch>
				</div>
			</StrictMode>
		</BwsRouter>
	);
}

const RootSession = Session(App);
export { RootSession };
