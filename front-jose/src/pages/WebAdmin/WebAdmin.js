import React, { useState } from 'react';
import './WebAdmin.css';
import Topbar from '../../components/Topbar';

const productosIniciales = [
  { id: 1, nombre: 'Pizza Americana', icono: '🍕', precio: 32.00, categoria: 'Pizzas', imagen: 'img_1.jpg', disponible: true },
  { id: 2, nombre: 'Pizza Hawaiana', icono: '🍍', precio: 35.00, categoria: 'Pizzas', imagen: 'img_2.jpg', disponible: true },
  { id: 3, nombre: 'Pizza Pepperoni', icono: '🍕', precio: 38.00, categoria: 'Pizzas', imagen: 'img_3.jpg', disponible: true },
  { id: 4, nombre: 'Calzone', icono: '🥟', precio: 28.00, categoria: 'Especiales', imagen: 'img_4.jpg', disponible: true },
  { id: 5, nombre: 'Inka Kola 1.5L', icono: '🥤', precio: 12.00, categoria: 'Bebidas', imagen: 'img_5.jpg', disponible: true },
];

const categorias = ['Pizzas', 'Especiales', 'Bebidas', 'General'];

function WebAdmin() {
  const [productos, setProductos] = useState(productosIniciales);
  const [direccion, setDireccion] = useState('Av. Perú 123, Abancay');
  const [telefono, setTelefono] = useState('083-321456');
  const [whatsapp, setWhatsapp] = useState('983123456');
  const [horario, setHorario] = useState('11:00 - 22:00');

  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('Pizzas');

  const abrirModal = () => {
    setNuevoNombre('');
    setNuevoPrecio('');
    setNuevaCategoria('Pizzas');
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const confirmarAgregar = () => {
    if (!nuevoNombre.trim()) { alert('Ingresa el nombre del producto.'); return; }
    const precio = parseFloat(nuevoPrecio);
    if (isNaN(precio) || precio <= 0) { alert('Ingresa un precio válido.'); return; }

    const nuevo = {
      id: Date.now(),
      nombre: nuevoNombre,
      icono: '🍕',
      precio,
      categoria: nuevaCategoria,
      imagen: 'sin_imagen.jpg',
      disponible: true,
    };
    setProductos(prev => [...prev, nuevo]);
    cerrarModal();
  };

  const toggleDisponible = (id) => {
    setProductos(prev =>
      prev.map(p => p.id === id ? { ...p, disponible: !p.disponible } : p)
    );
  };

  const eliminarProducto = (id) => {
    setProductos(prev => prev.filter(p => p.id !== id));
  };

  const guardarInfo = () => {
    alert('Información general guardada correctamente.');
  };

  return (
    <div className="webadmin-page">

      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Agregar Producto</h2>
              <span className="modal-cerrar" onClick={cerrarModal}>✕</span>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Nombre del producto</label>
                <input
                  type="text"
                  placeholder="Ej: Pizza Margarita"
                  value={nuevoNombre}
                  onChange={e => setNuevoNombre(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Precio S/</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={nuevoPrecio}
                  onChange={e => setNuevoPrecio(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>Categoría</label>
                <select value={nuevaCategoria} onChange={e => setNuevaCategoria(e.target.value)}>
                  {categorias.map(c => <option key={c}>{c}</option>)}
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

      <Topbar titulo="🌐 Web Admin" />

      <section className="webadmin-card">
        <div className="webadmin-top">
          <h3>Gestión de Productos Web (RF14-RF17)</h3>
          <button className="agregar-producto-btn" onClick={abrirModal}>
            + Agregar Producto
          </button>
        </div>

        <table className="productos-table">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>PRECIO (RF14)</th>
              <th>CATEGORÍA</th>
              <th>IMAGEN (RF15)</th>
              <th>DISPONIBLE</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td className="producto-nombre-cell">{p.icono} {p.nombre}</td>
                <td>S/ {p.precio.toFixed(2)}</td>
                <td>{p.categoria}</td>
                <td><span className="imagen-pill">{p.imagen}</span></td>
                <td>
                  <div
                    className={`toggle-switch ${p.disponible ? 'on' : 'off'}`}
                    onClick={() => toggleDisponible(p.id)}
                  >
                    <div className="toggle-circle"></div>
                  </div>
                </td>
                <td>
                  <button className="accion-btn editar">Editar</button>
                  <button className="accion-btn eliminar" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="webadmin-card">
        <h3>Información General (RF18)</h3>
        <div className="info-grid">
          <div className="info-field">
            <label>Dirección</label>
            <input value={direccion} onChange={e => setDireccion(e.target.value)} />
          </div>
          <div className="info-field">
            <label>Teléfono</label>
            <input value={telefono} onChange={e => setTelefono(e.target.value)} />
          </div>
          <div className="info-field">
            <label>WhatsApp</label>
            <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          </div>
          <div className="info-field">
            <label>Horario</label>
            <input value={horario} onChange={e => setHorario(e.target.value)} />
          </div>
        </div>
        <button className="guardar-info-btn" onClick={guardarInfo}>
          Guardar Información
        </button>
      </section>
    </div>
  );
}

export default WebAdmin;