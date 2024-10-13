import React, { createContext, useState } from 'react';

// Créez le contexte
const AuthContext = createContext({});

// Créez le fournisseur d'authentification
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logUserId, setUserId] = useState(null);

  // Fonction pour connecter un utilisateur
  const login = (paramId) => {
    console.log(paramId);
    setIsLoggedIn(true);
    setUserId(paramId);
  };

  // Fonction pour déconnecter un utilisateur
  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  // Valeur du contexte à fournir
  const authContextValue = {
    isLoggedIn,
    logUserId,
    login,
    logout,
  };

  // Rendu du contexte avec le fournisseur
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportez le contexte
export default AuthContext;
