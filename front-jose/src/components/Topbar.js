import React from 'react';
import './Topbar.css';

function Topbar({ titulo }) {
  return (
    <div className="topbar-global">
      <span className="topbar-titulo">{titulo}</span>
      <div className="topbar-user">
        <div className="topbar-user-info">
          <span className="topbar-user-name">Tito León Bazán</span>
          <span className="topbar-user-role">Administrador</span>
        </div>
        <div className="topbar-avatar">TL</div>
      </div>
    </div>
  );
}

export default Topbar;