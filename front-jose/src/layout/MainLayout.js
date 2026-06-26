import React from 'react';
import Sidebar from '../components/Sidebar';

function MainLayout({ pagina, onCambiarPagina, children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activo={pagina} onCambiarPagina={onCambiarPagina} />
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;