import React, { useState } from 'react';
import './Caja.css';
import Topbar from '../../components/Topbar';

const metodosIniciales = [
  { nombre: 'Efectivo', monto: 0 },
  { nombre: 'Yape', monto: 0 },
  { nombre: 'Plin', monto: 0 },
  { nombre: 'Tarjeta', monto: 0 },
];

function Caja() {
  const [movimientos, setMovimientos] = useState([]);
  const [metodos, setMetodos] = useState(metodosIniciales);
  const [modalCierre, setModalCierre] = useState(false);

  const ingresosHoy = movimientos.reduce((sum, m) => sum + m.monto, 0);
  const pedidosHoy = movimientos.length;
  const ticketPromedio = pedidosHoy > 0 ? ingresosHoy / pedidosHoy : 0;

  const ahora = new Date();
  const fechaHora = `${ahora.getFullYear()}-${String(ahora.getMonth()+1).padStart(2,'0')}-${String(ahora.getDate()).padStart(2,'0')} - ${String(ahora.getHours()).padStart(2,'0')}:${String(ahora.getMinutes()).padStart(2,'0')}`;

  const confirmarCierre = () => {
    setModalCierre(false);
    alert('Cierre de caja confirmado. Resumen guardado en histórico.');
  };

  return (
    <div className="caja-page">

      {modalCierre && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Cierre de Caja Diario</h2>
              <span className="modal-cerrar" onClick={() => setModalCierre(false)}>✕</span>
            </div>
            <div className="modal-body">
              <div className="cierre-total-box">
                <p className="cierre-fecha">Fecha: {fechaHora}</p>
                <p className="cierre-total-monto">S/ {ingresosHoy.toFixed(2)}</p>
              </div>
              <div className="cierre-metodos-grid">
                {metodos.map(m => (
                  <div className="cierre-metodo-item" key={m.nombre}>
                    <span className="cierre-metodo-nombre">{m.nombre}</span>
                    <span className="cierre-metodo-monto">S/ {m.monto.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <p className="cierre-pedidos-count">
                <strong>{pedidosHoy}</strong> pedidos registrados hoy
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-cancelar" onClick={() => setModalCierre(false)}>Cancelar</button>
              <button className="modal-registrar" onClick={confirmarCierre}>Confirmar Cierre</button>
            </div>
          </div>
        </div>
      )}

      <Topbar titulo="💰 Caja" />

      <section className="caja-stats">
        <div className="caja-stat-card">
          <p className="caja-stat-label">Ingresos Hoy (RF2)</p>
          <p className="caja-stat-value verde">S/ {ingresosHoy.toFixed(2)}</p>
          <span className="caja-stat-sub">{movimientos.length} movimientos</span>
        </div>
        <div className="caja-stat-card">
          <p className="caja-stat-label">Pedidos Hoy</p>
          <p className="caja-stat-value">{pedidosHoy}</p>
        </div>
        <div className="caja-stat-card">
          <p className="caja-stat-label">Ticket Promedio</p>
          <p className="caja-stat-value">S/ {ticketPromedio.toFixed(2)}</p>
        </div>
      </section>

      <section className="caja-grid">
        <div className="caja-card">
          <h3>Desglose por Método (RF5)</h3>
          <div className="metodo-lista">
            {metodos.map(m => (
              <div className="metodo-item" key={m.nombre}>
                <span>{m.nombre}</span>
                <span>S/ {m.monto.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="caja-card">
          <h3>Acciones</h3>
          <button className="cierre-btn" onClick={() => setModalCierre(true)}>
            💰 Cierre de Caja Diario (RF6)
          </button>
          <p className="cierre-nota">Genera resumen completo del día y guarda histórico</p>
        </div>
      </section>

      <section className="caja-card">
        <h3>Movimientos de Hoy - Tiempo Real (RF3)</h3>
        <table className="movimientos-table">
          <thead>
            <tr>
              <th>HORA</th>
              <th>PEDIDO #</th>
              <th>CONCEPTO (RF4)</th>
              <th>MÉTODO</th>
              <th>INGRESO</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.length === 0 ? (
              <tr>
                <td colSpan="5" className="sin-movimientos">
                  Aún no hay movimientos registrados hoy.
                </td>
              </tr>
            ) : (
              movimientos.map((m, i) => (
                <tr key={i}>
                  <td>{m.hora}</td>
                  <td>{m.pedido}</td>
                  <td>{m.concepto}</td>
                  <td>{m.metodo}</td>
                  <td>S/ {m.monto.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Caja;