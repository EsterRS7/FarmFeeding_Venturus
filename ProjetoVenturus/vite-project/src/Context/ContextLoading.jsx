// src/context/ContextLoading.jsx
import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoadingInternal] = useState(false);

  const setIsLoading = (value) => {
    if (value) {
      setIsLoadingInternal(true); // Ativa o loading imediatamente
    } else {
      // Garante que o loading dure pelo menos 1 segundo
      setTimeout(() => {
        setIsLoadingInternal(false);
      }, 1000);
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);