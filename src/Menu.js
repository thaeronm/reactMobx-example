import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

class Menu extends Component {
	nombreRef = React.createRef();
	fotoRef = React.createRef();
  render() {
    const { ArepaStore } = this.props;
    return (
      <div>
			<h1>Cantidad de arepas: {ArepaStore.numeroArepas}</h1>
				<form 
					onSubmit={e => {
						e.preventDefault();
						ArepaStore.agregarArepa({
							nombre: this.nombreRef.current.value, 
							foto: this.fotoRef.current.value,
						});
						e.target.reset();
					}}
				>
					<input
						type = "text"
						placeholder = "Nombre de la arepa"
						required 
						ref = {this.nombreRef}
					/>
					<input
						type = "text"
						placeholder = "Url de la arepa"
						required 
						ref = {this.fotoRef}
					/>
					<button type="submit">Guardar</button>
				</form>
        <ul>
          {ArepaStore.arepas.map(arepa => (
            <li key={arepa.nombre}>
              <h2>{arepa.nombre}</h2>
				<img
					src={arepa.foto}
					alt={arepa.nombre}
					style={{maxWidth: "150px"}}
				/>
				<button 
					onClick={e => {
						e.preventDefault();
						ArepaStore.eliminarArepa(arepa._id);
					}}
				>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default inject('ArepaStore')(observer(Menu));