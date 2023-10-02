import React, { createContext, useContext, useState } from "react";

const ReactContext = createContext();

const ReactProvider = ({ children }) => {
  const [stateInContext, setStateInContext] = useState();

  return (
    <ReactContext.Provider value={{ stateInContext, setStateInContext }}>
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

export { ReactProvider, useReactContext };
