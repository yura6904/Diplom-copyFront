import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { useRoutes } from './routes';
import { useAuth } from './components/Authorization/authHook';
import { AuthContext } from './context/AuthContext';

function App(props) {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  debugger;
  return (
    <AuthContext.Provider value = {{token, login, logout, userId, isAuthenticated}}>
      <Router>
        {isAuthenticated && <HeaderContainer />}
        <div className="App">
          {routes}  
        </div>
      </Router>
    </AuthContext.Provider>
    
    
  );
}

export default App;
