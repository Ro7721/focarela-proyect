import React from 'react';
import './Sidebar.css';

const menuItems = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '🍕', label: 'Pedidos' },
  { icon: '💰', label: 'Caja' },
  { icon: '📦', label: 'Inventario' },
  { icon: '📉', label: 'Gastos' },
  { icon: '🌐', label: 'Web Admin' },
  { icon: '📈', label: 'Reportes' },
  { icon: '📄', label: 'SUNAT / Interno' },
  { icon: '👥', label: 'Usuarios' },
];

function Sidebar({ activo, onCambiarPagina }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">🍕</span>
        <span className="sidebar-logo-text">FOCARELA</span>
      </div>

      <div className="sidebar-menu">
        {menuItems.map(item => (
          <div
            key={item.label}
            className={`sidebar-item ${activo === item.label ? 'activo' : ''}`}
            onClick={() => onCambiarPagina(item.label)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">v1.0 • Abancay, Perú</div>
    </div>
  );
}

export default Sidebar;