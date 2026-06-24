import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [logueado, setLogueado] = useState(false);

  return (
    <div>
      {logueado ? (
        <Dashboard />
      ) : (
        <Login onLogin={() => setLogueado(true)} />
      )}
    </div>
  );
}

export default App;