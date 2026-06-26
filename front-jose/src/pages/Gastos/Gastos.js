import React, { useState } from 'react';
import './Gastos.css';
import Topbar from '../../components/Topbar';
const gastosIniciales = [
  { id: 1, fecha: '2026-06-15', tipo: 'Alquiler', descripcion: 'Local Av. Perú', monto: 1200.00 },
  { id: 2, fecha: '2026-06-15', tipo: 'Ingredientes', descripcion: 'Compra queso y masa', monto: 350.00 },
  { id: 3, fecha: '2024-06-28', tipo: 'Luz', descripcion: 'Recibo junio', monto: 180.00 },
];

const tiposGasto = ['Agua', 'Luz', 'Alquiler', 'Ingredientes', 'Otro'];

function Gastos() {
  const [gastos, setGastos] = useState(gastosIniciales);
  const [fecha, setFecha] = useState('');
  const [tipo, setTipo] = useState('Agua');
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const totalMes = gastos.reduce((sum, g) => sum + g.monto, 0);

  const totalesPorTipo = gastos.reduce((acc, g) => {
    acc[g.tipo] = (acc[g.tipo] || 0) + g.monto;
    return acc;
  }, {});

  const guardarGasto = () => {
    if (!fecha || !monto) {
      alert('Completa al menos la fecha y el monto.');
      return;
    }
    const nuevo = {
      id: Date.now(),
      fecha,
      tipo,
      descripcion: descripcion || '-',
      monto: parseFloat(monto),
    };
    setGastos(prev => [nuevo, ...prev]);
    setFecha('');
    setMonto('');
    setDescripcion('');
  };

  const eliminarGasto = (id) => {
    setGastos(prev => prev.filter(g => g.id !== id));
  };

  return (
    <div className="gastos-page">
  <Topbar titulo="📉 Gastos" />

      <section className="gastos-grid">
        <div className="gastos-card">
          <h3>Registrar Gasto (RF7)</h3>

          <div className="form-row">
            <div className="form-field">
              <label>Fecha</label>
              <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
            </div>
            <div className="form-field tipo-field">
              <label>Tipo</label>
              <div className="tipo-select-row">
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                  {tiposGasto.map(t => <option key={t}>{t}</option>)}
                </select>
                <button className="add-tipo-btn" title="Agregar tipo">+</button>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Monto S/</label>
              <input
                type="number"
                placeholder="0.00"
                value={monto}
                onChange={e => setMonto(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Descripción</label>
              <input
                type="text"
                placeholder="Detalle"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </div>
          </div>

          <button className="guardar-gasto-btn" onClick={guardarGasto}>
            Guardar Gasto
          </button>
        </div>

        <div className="gastos-card">
          <h3>Total del Mes (RF11)</h3>
          <p className="total-mes">S/ {totalMes.toFixed(2)}</p>
          <div className="desglose-tipo">
            {Object.entries(totalesPorTipo).map(([t, m]) => (
              <div className="desglose-item" key={t}>
                <span>{t}</span>
                <span className="desglose-monto">S/ {m.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gastos-card historial-card">
        <h3>Historial de Gastos (RF9 - Orden Cronológico)</h3>
        <table className="gastos-table">
          <thead>
            <tr>
              <th>FECHA</th>
              <th>TIPO</th>
              <th>DESCRIPCIÓN</th>
              <th>MONTO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map(g => (
              <tr key={g.id}>
                <td>{g.fecha}</td>
                <td><span className="tipo-pill">{g.tipo}</span></td>
                <td>{g.descripcion}</td>
                <td className="monto-rojo">S/ {g.monto.toFixed(2)}</td>
                <td>
                  <button className="accion-btn editar">Editar</button>
                  <button className="accion-btn eliminar" onClick={() => eliminarGasto(g.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Gastos;