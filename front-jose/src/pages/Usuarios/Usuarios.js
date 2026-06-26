import React, { useState } from 'react';
import './Usuarios.css';
import Topbar from '../../components/Topbar';

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
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState('Cajero');

  const abrirModal = () => {
    setNuevoUsuario('');
    setNuevoNombre('');
    setNuevoRol('Cajero');
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const confirmarAgregar = () => {
    if (!nuevoUsuario.trim()) { alert('Ingresa el nombre de usuario.'); return; }
    if (!nuevoNombre.trim()) { alert('Ingresa el nombre completo.'); return; }
    const nuevo = {
      id: Date.now(),
      usuario: nuevoUsuario,
      nombre: nuevoNombre,
      rol: nuevoRol,
      acceso: accesoPorRol[nuevoRol],
      estado: 'Activo',
    };
    setUsuarios(prev => [...prev, nuevo]);
    cerrarModal();
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

      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Agregar Usuario</h2>
              <span className="modal-cerrar" onClick={cerrarModal}>✕</span>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Nombre de usuario</label>
                <input
                  type="text"
                  placeholder="Ej: cajero2"
                  value={nuevoUsuario}
                  onChange={e => setNuevoUsuario(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Nombre completo</label>
                <input
                  type="text"
                  placeholder="Ej: Rosa García"
                  value={nuevoNombre}
                  onChange={e => setNuevoNombre(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Rol</label>
                <select value={nuevoRol} onChange={e => setNuevoRol(e.target.value)}>
                  <option>Administrador</option>
                  <option>Cajero</option>
                  <option>Cocina</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-cancelar" onClick={cerrarModal}>Cancelar</button>
              <button className="modal-registrar" onClick={confirmarAgregar}>Agregar</button>
            </div>
          </div>
        </div>
      )}

      <Topbar titulo="👥 Usuarios" />

      <section className="usuarios-card">
        <div className="usuarios-top">
          <h3>Gestión de Usuarios y Roles (RNF Seguridad)</h3>
          <button className="agregar-usuario-btn" onClick={abrirModal}>
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