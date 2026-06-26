import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Reportes.css';
import Topbar from '../../components/Topbar';

const datosIniciales = [
  { periodo: 'Sem 1', ingresos: 320, gastos: 280 },
  { periodo: 'Sem 2', ingresos: 410, gastos: 300 },
  { periodo: 'Sem 3', ingresos: 280, gastos: 450 },
  { periodo: 'Sem 4', ingresos: 155, gastos: 520 },
];

function Reportes() {
  const [periodoTipo, setPeriodoTipo] = useState('Mensual');
  const [desde, setDesde] = useState('2026-05-26');
  const [hasta, setHasta] = useState('2026-06-25');

  const ingresosTotales = 155.00;
  const gastosTotales = 1550.00;
  const utilidadNeta = ingresosTotales - gastosTotales;

  const actualizar = () => {
    alert(`Reporte actualizado\nPeriodo: ${periodoTipo}\nDesde: ${desde}\nHasta: ${hasta}`);
  };

  const exportarCSV = () => {
    let csv = 'Periodo,Ingresos,Gastos\n';
    datosIniciales.forEach(d => {
      csv += `${d.periodo},${d.ingresos},${d.gastos}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte_focarela.csv';
    link.click();
  };

  return (
    <div className="reportes-page">
      <Topbar titulo="📈 Reportes" />

      <section className="reportes-card">
        <h3>Reportes (RF29-RF34)</h3>
        <div className="filtros-row">
          <div className="filtro-field">
            <label>Periodo</label>
            <select value={periodoTipo} onChange={e => setPeriodoTipo(e.target.value)}>
              <option>Diario</option>
              <option>Semanal</option>
              <option>Mensual</option>
              <option>Anual</option>
            </select>
          </div>
          <div className="filtro-field">
            <label>Desde</label>
            <input type="date" value={desde} onChange={e => setDesde(e.target.value)} />
          </div>
          <div className="filtro-field">
            <label>Hasta</label>
            <input type="date" value={hasta} onChange={e => setHasta(e.target.value)} />
          </div>
          <button className="actualizar-btn" onClick={actualizar}>Actualizar</button>
        </div>
      </section>

      <section className="reportes-stats">
        <div className="reportes-stat-card">
          <p className="reportes-stat-label">Ingresos Totales</p>
          <p className="reportes-stat-value verde">S/ {ingresosTotales.toFixed(2)}</p>
        </div>
        <div className="reportes-stat-card">
          <p className="reportes-stat-label">Gastos Totales</p>
          <p className="reportes-stat-value rojo">S/ {gastosTotales.toFixed(2)}</p>
        </div>
        <div className="reportes-stat-card">
          <p className="reportes-stat-label">Utilidad Neta</p>
          <p className={`reportes-stat-value ${utilidadNeta >= 0 ? 'verde' : 'rojo'}`}>
            S/ {utilidadNeta.toFixed(2)}
          </p>
        </div>
      </section>

      <section className="reportes-card">
        <div className="grafico-top">
          <h3>Ingresos vs Gastos</h3>
          <button className="exportar-btn" onClick={exportarCSV}>Exportar CSV</button>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={datosIniciales}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="periodo" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" fill="#27ae60" radius={[4, 4, 0, 0]} name="Ingresos" />
            <Bar dataKey="gastos" fill="#c0392b" radius={[4, 4, 0, 0]} name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

export default Reportes;