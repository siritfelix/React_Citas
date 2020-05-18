import React, { Fragment, useState } from "react";
import uuid from "uuid/dist/v4";
import PropTypes from 'prop-types';
const Formulario = ({ crearCita }) => {
  //Crear el useState
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });
  //Un use state para mostrar error
  const [error, actualizarerror] = useState(false);
  //Funcion que se ejecuta cuando se escribe en los campor de form
  const actualizarState = (e) => {
    actualizarCita({ ...cita, [e.target.name]: e.target.value });
  };
  //Estraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;
  const submitCita = (e) => {
    e.preventDefault();
    //Validar los datos el trim elimina espacios en blanco
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      console.log("hay un error");
      actualizarerror(true);
      return;
    }    
    actualizarerror(false);
    //asignar ID se agrego libreria uuid
    cita.id = uuid();
    //Crear la cita
    crearCita(cita);
    //Reiniciar el form
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    });
  };
  return (
    <Fragment>
      <h2>Crear citas</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}
      <form onSubmit={submitCita}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de la mascota"
          onChange={actualizarState}
          value={mascota}
        ></input>
        <label>Nombre del Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del propietario"
          onChange={actualizarState}
          value={propietario}
        ></input>
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        ></input>
        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        ></input>
        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};
Formulario.propTypes={
    crearCita : PropTypes.func.isRequired
}
export default Formulario;
