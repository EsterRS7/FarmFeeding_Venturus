// src/pages/Dashboard.jsx
import React,  { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); 
  };
  
  return (
    <button onClick={handleLogout}>Sair</button>
  );
};

export {Dashboard};
