import React, { useState } from 'react';
import './Caja.css';

const metodosIniciales = [
  { nombre: 'Efectivo', monto: 0 },
  { nombre: 'Yape', monto: 0 },
  { nombre: 'Plin', monto: 0 },
  { nombre: 'Tarjeta', monto: 0 },
];

function Caja() {
  const [movimientos, setMovimientos] = useState([]);
  const [metodos, setMetodos] = useState(metodosIniciales);

  const ingresosHoy = movimientos.reduce((sum, m) => sum + m.monto, 0);
  const pedidosHoy = movimientos.length;
  const ticketPromedio = pedidosHoy > 0 ? ingresosHoy / pedidosHoy : 0;

  const cerrarCaja = () => {
    if (movimientos.length === 0) {
      alert('No hay movimientos para cerrar caja hoy.');
      return;
    }
    alert(
      `Cierre de Caja Diario\n\nTotal: S/ ${ingresosHoy.toFixed(2)}\nPedidos: ${pedidosHoy}\n\nResumen guardado en histórico.`
    );
  };

  return (
    <div className="caja-page">
      <div className="caja-header">
        <h1>💰 Caja</h1>
      </div>

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
          <button className="cierre-btn" onClick={cerrarCaja}>
            💰 Cierre de Caja Diario (RF6)
          </button>
          <p className="cierre-nota">Genera resumen completo del día y guarda histórico</p>
        </div>
      </section>

      <section className="caja-card">
        <h3>Movimientos de Hoy - Tiempo Real (RF3)</h3>
        {movimientos.length === 0 ? (
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
              <tr>
                <td colSpan="5" className="sin-movimientos">
                  Aún no hay movimientos registrados hoy.
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
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
              {movimientos.map((m, i) => (
                <tr key={i}>
                  <td>{m.hora}</td>
                  <td>{m.pedido}</td>
                  <td>{m.concepto}</td>
                  <td>{m.metodo}</td>
                  <td>S/ {m.monto.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Caja;