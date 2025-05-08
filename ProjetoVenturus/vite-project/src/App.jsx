// src/App.jsx
import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Router } from './Router';
import { AuthProvider } from './Context';
import { LoadingProvider, useLoading } from './Context/ContextLoading';
import React from 'react';
import Loading from './components/Loading/loading';

const AppContent = () => {
  const { isLoading, setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    console.log('Rota mudou:', location.pathname, 'isLoading:', isLoading); // Depuração
    setIsLoading(false); // Desativa o loading quando a rota muda
  }, [location, setIsLoading]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ display: isLoading ? 'none' : 'block' }}>
          <Router />
        </div>
      )}
      {isLoading && console.log('Rendering Loading component')} {/* Depuração */}
    </>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <LoadingProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </LoadingProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;