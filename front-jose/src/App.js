import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pedidos from './components/Pedidos';

function App() {
  const [logueado, setLogueado] = useState(false);
  const [pagina, setPagina] = useState('Dashboard');

  if (!logueado) {
    return <Login onLogin={() => setLogueado(true)} />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activo={pagina} onCambiarPagina={setPagina} />
      {pagina === 'Dashboard' && <Dashboard />}
      {pagina === 'Pedidos' && <Pedidos />}
    </div>
  );
}

export default App;