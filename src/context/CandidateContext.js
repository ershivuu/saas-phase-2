import React, { createContext, useContext } from "react";

export const ApiDataContext = createContext({});

export const ApiDataProvider = ({ children, userData }) => {
    console.log("userData inside ApiDataProvider:", userData);
  return (
    <ApiDataContext.Provider value={{ userData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => {
  return useContext(ApiDataContext);
};
