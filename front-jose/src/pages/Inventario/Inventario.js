import React, { useState } from 'react';
import './Inventario.css';
import Topbar from '../../components/Topbar';

const insumosIniciales = [
  { id: 1, nombre: 'Masa', stock: 50, unidad: 'unid', minimo: 10 },
  { id: 2, nombre: 'Queso Mozzarella', stock: 20, unidad: 'kg', minimo: 3 },
  { id: 3, nombre: 'Salsa tomate', stock: 15, unidad: 'L', minimo: 2 },
  { id: 4, nombre: 'Pepperoni', stock: 8, unidad: 'kg', minimo: 1 },
  { id: 5, nombre: 'Jamón', stock: 10, unidad: 'kg', minimo: 1.5 },
  { id: 6, nombre: 'Piña', stock: 5, unidad: 'kg', minimo: 1 },
  { id: 7, nombre: 'Gaseosas', stock: 48, unidad: 'unid', minimo: 12 },
];

function Inventario() {
  const [insumos, setInsumos] = useState(insumosIniciales);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [insumoId, setInsumoId] = useState(insumosIniciales[0].id);
  const [cantidad, setCantidad] = useState('');
  const [proveedor, setProveedor] = useState('');

  const abrirModal = () => {
    setInsumoId(insumos[0].id);
    setCantidad('');
    setProveedor('');
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const registrarCompra = () => {
    const cant = parseFloat(cantidad);
    if (isNaN(cant) || cant <= 0) {
      alert('Ingresa una cantidad válida.');
      return;
    }
    const insumo = insumos.find(i => i.id === Number(insumoId));
    setInsumos(prev =>
      prev.map(i => i.id === insumo.id ? { ...i, stock: i.stock + cant } : i)
    );
    alert(`Compra registrada:\n+${cant} ${insumo.unidad} de ${insumo.nombre}\nProveedor: ${proveedor || 'No especificado'}`);
    cerrarModal();
  };

  return (
    <div className="inventario-page">
      <Topbar titulo="📦 Inventario" />

      <section className="inventario-card">
        <div className="inventario-top">
          <h3>Control de Insumos (RF37-RF39)</h3>
          <button className="registrar-compra-btn" onClick={abrirModal}>
            + Registrar Compra
          </button>
        </div>

        <table className="inventario-table">
          <thead>
            <tr>
              <th>INSUMO</th>
              <th>STOCK ACTUAL</th>
              <th>UNIDAD</th>
              <th>MÍNIMO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {insumos.map(i => {
              const critico = i.stock <= i.minimo;
              return (
                <tr key={i.id}>
                  <td className="insumo-nombre">{i.nombre}</td>
                  <td className={critico ? 'stock-critico' : 'stock-ok'}>{i.stock}</td>
                  <td>{i.unidad}</td>
                  <td>{i.minimo}</td>
                  <td>
                    <span className={`estado-pill ${critico ? 'critico' : 'ok'}`}>
                      {critico ? 'CRÍTICO' : 'OK'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="inventario-nota">
          ✓ Actualización automática al registrar pedidos (RF38) - Consulta en tiempo real (RF39)
        </p>
      </section>

      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Compra de Insumos</h2>
              <span className="modal-cerrar" onClick={cerrarModal}>✕</span>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Insumo</label>
                <select value={insumoId} onChange={e => setInsumoId(e.target.value)}>
                  {insumos.map(i => (
                    <option key={i.id} value={i.id}>{i.nombre} ({i.unidad})</option>
                  ))}
                </select>
              </div>
              <div className="modal-field">
                <label>Cantidad</label>
                <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} placeholder="0" />
              </div>
              <div className="modal-field">
                <label>Proveedor</label>
                <input type="text" value={proveedor} onChange={e => setProveedor(e.target.value)} placeholder="Ej: Distribuidora Abancay" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-cancelar" onClick={cerrarModal}>Cancelar</button>
              <button className="modal-registrar" onClick={registrarCompra}>Registrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventario;