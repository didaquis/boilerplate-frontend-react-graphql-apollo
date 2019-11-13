import React, { Fragment } from 'react';

import Clientes from './Clientes';

const Estadisticas = (props) => {

		return(
			<Fragment>
				<h2 className="text-center">Panel estadísticas</h2>
				<Clientes />
			</Fragment>
		);
}

export default Estadisticas;
