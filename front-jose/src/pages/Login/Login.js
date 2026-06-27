import React, { useState } from 'react';
import './Login.css';
import logoFocarela from '../../assets/logo_focarela.png';

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

        <div className="login-left">
          <img src={logoFocarela} alt="Focarela Pizza's" className="logo-imagen" />
        </div>

        <div className="login-right">
          <h2 className="login-titulo">Iniciar Sesión</h2>

          <div className="login-field">
            <label>👤 Usuario</label>
            <input
              type="text"
              placeholder="Value"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>🔒 Contraseña</label>
            <input
              type="password"
              placeholder="Value"
              value={contrasena}
              onChange={e => setContrasena(e.target.value)}
            />
          </div>

          <button className="login-button" onClick={handleLogin}>
            → Ingresar
          </button>

          <p className="login-demo">
           bienvenido a focarela pizza's 
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login;