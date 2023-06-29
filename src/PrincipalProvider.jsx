import React, { createContext, useState } from 'react';

export const PrincipalContext = createContext();

export const PrincipalProvider = ({ children }) => {
const [instancia, setInstancia] = useState(1);
const [votacion, setVotacion] = useState([]);
const [candidatoSeleccionadoProvider, setCandidatoSeleccionadoProvider] = useState({});
// Barra Lateral
const [ candidatoDetalle, setCandidatoDetalle] = useState({});
  return (
    <PrincipalContext.Provider
      value={
        {instancia, setInstancia, votacion, setVotacion, candidatoSeleccionadoProvider, setCandidatoSeleccionadoProvider,  candidatoDetalle, setCandidatoDetalle}
    }
    >
      {children}
    </PrincipalContext.Provider>
  );
};
