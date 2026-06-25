import React, { useState } from 'react';
import './Usuarios.css';

const usuariosIniciales = [
  { id: 1, usuario: 'admin', nombre: 'Tito León Bazán', rol: 'Administrador', acceso: 'Todo', estado: 'Activo' },
  { id: 2, usuario: 'cajero1', nombre: 'Rosa Cajera', rol: 'Cajero', acceso: 'Pedidos y Caja', estado: 'Activo' },
  { id: 3, usuario: 'cocina1', nombre: 'Miguel Cocina', rol: 'Cocina', acceso: 'Ver pedidos', estado: 'Activo' },
];

const accesoPorRol = {
  Administrador: 'Todo',
  Cajero: 'Pedidos y Caja',
  Cocina: 'Ver pedidos',
};

function Usuarios() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales);

  const agregarUsuario = () => {
    const usuario = prompt('Nombre de usuario (ej: cajero2):');
    if (!usuario) return;
    const nombre = prompt('Nombre completo:');
    if (!nombre) return;
    const rol = prompt('Rol (Administrador, Cajero, Cocina):', 'Cajero');
    if (!rol || !accesoPorRol[rol]) {
      alert('Rol no válido. Usa: Administrador, Cajero o Cocina.');
      return;
    }

    const nuevo = {
      id: Date.now(),
      usuario,
      nombre,
      rol,
      acceso: accesoPorRol[rol],
      estado: 'Activo',
    };
    setUsuarios(prev => [...prev, nuevo]);
  };

  const toggleEstado = (id) => {
    setUsuarios(prev =>
      prev.map(u =>
        u.id === id ? { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' } : u
      )
    );
  };

  const rolClase = (rol) => {
    if (rol === 'Administrador') return 'rol-admin';
    if (rol === 'Cajero') return 'rol-cajero';
    return 'rol-cocina';
  };

  return (
    <div className="usuarios-page">
      <div className="usuarios-header">
        <h1>👥 Usuarios</h1>
      </div>

      <section className="usuarios-card">
        <div className="usuarios-top">
          <h3>Gestión de Usuarios y Roles (RNF Seguridad)</h3>
          <button className="agregar-usuario-btn" onClick={agregarUsuario}>
            + Agregar Usuario
          </button>
        </div>

        <table className="usuarios-table">
          <thead>
            <tr>
              <th>USUARIO</th>
              <th>NOMBRE</th>
              <th>ROL</th>
              <th>ACCESO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id}>
                <td className="usuario-cell">{u.usuario}</td>
                <td>{u.nombre}</td>
                <td><span className={`rol-pill ${rolClase(u.rol)}`}>{u.rol}</span></td>
                <td>{u.acceso}</td>
                <td>
                  <span
                    className={`estado-pill ${u.estado === 'Activo' ? 'activo' : 'inactivo'}`}
                    onClick={() => toggleEstado(u.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {u.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="usuarios-nota">
          • Administrador: acceso total &nbsp;•&nbsp; Cajero: solo pedidos y caja &nbsp;•&nbsp; Cocina: solo ver pedidos
        </p>
      </section>
    </div>
  );
}

export default Usuarios;