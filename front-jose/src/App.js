import React, { useState } from 'react';

function App() {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin' && contrasena === 'focarela') {
      alert('¡Bienvenido al sistema FOCARELA!');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #c0392b, #e67e22)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        width: '360px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <div style={{
          background: '#c0392b',
          borderRadius: '16px',
          width: '70px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '36px'
        }}>🍕</div>

        <h1 style={{ color: '#1a1a1a', fontSize: '28px', margin: '0 0 4px' }}>FOCARELA</h1>
        <p style={{ color: '#888', fontSize: '14px', margin: '0 0 28px' }}>Sistema de Gestión e Inventario</p>

        <div style={{ textAlign: 'left', marginBottom: '16px' }}>
          <label style={{ fontSize: '14px', color: '#333' }}>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            style={{
              width: '100%', padding: '12px', marginTop: '6px',
              border: '1px solid #ddd', borderRadius: '8px',
              fontSize: '14px', boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ textAlign: 'left', marginBottom: '24px' }}>
          <label style={{ fontSize: '14px', color: '#333' }}>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            style={{
              width: '100%', padding: '12px', marginTop: '6px',
              border: '1px solid #ddd', borderRadius: '8px',
              fontSize: '14px', boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: '14px',
            background: '#c0392b', color: 'white',
            border: 'none', borderRadius: '8px',
            fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
          }}
        >
          Ingresar al Sistema
        </button>

        <p style={{
          marginTop: '16px', fontSize: '12px', color: '#888',
          background: '#fff8f0', padding: '8px', borderRadius: '6px'
        }}>
          Demo: usuario <strong>admin</strong> / contraseña <strong>focarela</strong>
        </p>
      </div>
    </div>
  );
}

export default App;