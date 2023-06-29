import React, { createContext, useState } from 'react';

export const PrincipalContext = createContext();

export const PrincipalProvider = ({ children }) => {
const [instancia, setInstancia] = useState(1);
const [votacion, setVotacion] = useState([]);
  return (
    <PrincipalContext.Provider
      value={{instancia, setInstancia, votacion, setVotacion}}
    >
      {children}
    </PrincipalContext.Provider>
  );
};
