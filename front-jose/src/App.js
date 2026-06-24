import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Pedidos from './pages/Pedidos/Pedidos';
import MainLayout from './layout/MainLayout';

function App() {
  const [logueado, setLogueado] = useState(false);
  const [pagina, setPagina] = useState('Dashboard');

  if (!logueado) {
    return <Login onLogin={() => setLogueado(true)} />;
  }

  return (
    <MainLayout pagina={pagina} onCambiarPagina={setPagina}>
      {pagina === 'Dashboard' && <Dashboard />}
      {pagina === 'Pedidos' && <Pedidos />}
    </MainLayout>
  );
}

export default App;