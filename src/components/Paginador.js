import React, { Component } from 'react';

class Paginador extends Component {

	state = {
		paginador: {
			paginas: Math.ceil(Number(this.props.totalRegistros) / this.props.limiteRegistrosVisibles)
		}
	}

	render() {

		const { actual } = this.props;
		const {paginas} = this.state.paginador;

		const btnAnterior = (actual > 1)
			?
				<button
					type="button"
					className="btn btn-success mr-2"
					onClick={this.props.paginaAnterior}
				>&laquo; Anterior</button> 
			:
				'';


		let btnSiguiente = '';

		if (paginas !== 0) {
			btnSiguiente = (actual !== paginas)
				?
					<button
						type="button"
						className="btn btn-success"
						onClick={this.props.paginaSiguiente}
					>Siguiente &raquo;</button> 
				:
					'';
		}

		return (
			<div className="mt-5 mb-4 d-flex justify-content-center">
				{btnAnterior}
				{btnSiguiente}
			</div>
		);
	}
	
}

export default Paginador;
