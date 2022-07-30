import { createContext, useContext, useReducer } from "react";

export const Statecontext = createContext();

export const Stateprovider = ({ children, initalState, reducer }) => (
  <Statecontext.Provider value={useReducer(reducer, initalState)}>
    {children}
  </Statecontext.Provider>
);

export const useStateprovider = () => useContext(Statecontext);
