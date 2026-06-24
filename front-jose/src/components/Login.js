import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin' && contrasena === 'focarela') {
      onLogin();
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">🍕</div>

        <h1 className="login-title">FOCARELA</h1>
        <p className="login-subtitle">Sistema de Gestión e Inventario</p>

        <div className="login-field">
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={handleLogin}>
          Ingresar al Sistema
        </button>

        <p className="login-demo">
          Demo: usuario <strong>admin</strong> / contraseña <strong>focarela</strong>
        </p>
      </div>
    </div>
  );
}

export default Login;