import React from 'react';
import { Redirect, Route } from 'react-router-dom';
 
const PrivateRoute = ({component: PrivateComponent, usuarioAutenticado, ...rest}) => {
    return ( 
        <Route
            {...rest}
            render={ (props) => {
				return (
					usuarioAutenticado ? (
						<PrivateComponent infoUsuario={usuarioAutenticado} {...props} />
					) : (
						<Redirect to={{
							pathname: '/login',
							state: { from: props.location }
						}} />
					)
				);
			}}
        />
    );
}

export default PrivateRoute;