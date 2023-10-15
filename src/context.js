import React, { createContext, useContext, useState } from "react";

const ReactContext = createContext();

const ReactProvider = ({ children }) => {
  const [stateInContext, setStateInContext] = useState();

  return (
    <ReactContext.Provider value={{ state: stateInContext, setState: setStateInContext }}>
      {children}
    </ReactContext.Provider>
  );
};

const useReactContext = () => {
  const context = useContext(ReactContext);
  if (!context) {
    throw new Error("useReactContext must be used within ReactProvider");
  }
  return context;
};

function getGlobal(key) {
  return (window.APP_CONTEXT)[key];
}

function setGlobal(key, value) {
  (window.APP_CONTEXT)[key] = value;
}

export { ReactProvider, useReactContext, getGlobal, setGlobal };
