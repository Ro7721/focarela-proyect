import React, { useState } from 'react';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Pedidos from './pages/Pedidos/Pedidos';
import Caja from './pages/Caja/Caja';
import Inventario from './pages/Inventario/Inventario';
import Gastos from './pages/Gastos/Gastos';
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
      {pagina === 'Caja' && <Caja />}
      {pagina === 'Inventario' && <Inventario />}
      {pagina === 'Gastos' && <Gastos />}
    </MainLayout>
  );
}

export default App;