import React, { useState } from 'react';
import './SunatInterno.css';
import Topbar from '../../components/Topbar';

const comprobantesSunat = [
  { serie: 'B001', numero: '000124', tipo: 'Boleta', cliente: 'María López', monto: 76.00, estado: 'Aceptado' },
  { serie: 'B001', numero: '000125', tipo: 'Boleta', cliente: 'Carlos Ruiz', monto: 35.00, estado: 'Aceptado' },
];

const ventasInternas = [
  { numero: 'INT-001', tipo: 'Nota interna', cliente: 'Juan Pérez', monto: 44.00, estado: 'Sin comprobante' },
];

function SunatInterno() {
  const [tab, setTab] = useState('SUNAT');

  return (
    <div className="sunat-page">
      <Topbar titulo="📄 SUNAT / Interno" />

      <section className="sunat-card">
        <div className="aviso-box">
          <strong>Separación garantiza cumplimiento sin mezclar información.</strong>{' '}
          Ventas con comprobante fiscal (SUNAT) vs ventas internas.
        </div>

        <div className="sunat-tabs">
          <span className={tab === 'SUNAT' ? 'tab activo' : 'tab'} onClick={() => setTab('SUNAT')}>
            SUNAT
          </span>
          <span className={tab === 'Interno' ? 'tab activo' : 'tab'} onClick={() => setTab('Interno')}>
            Interno
          </span>
        </div>

        {tab === 'SUNAT' ? (
          <table className="sunat-table">
            <thead>
              <tr>
                <th>SERIE</th>
                <th>NÚMERO</th>
                <th>TIPO</th>
                <th>CLIENTE</th>
                <th>MONTO</th>
                <th>ESTADO SUNAT</th>
              </tr>
            </thead>
            <tbody>
              {comprobantesSunat.map((c, i) => (
                <tr key={i}>
                  <td>{c.serie}</td>
                  <td>{c.numero}</td>
                  <td><span className="tipo-pill boleta">{c.tipo}</span></td>
                  <td>{c.cliente}</td>
                  <td>S/ {c.monto.toFixed(2)}</td>
                  <td><span className="estado-pill aceptado">{c.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="sunat-table">
            <thead>
              <tr>
                <th>NÚMERO</th>
                <th>TIPO</th>
                <th>CLIENTE</th>
                <th>MONTO</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {ventasInternas.map((v, i) => (
                <tr key={i}>
                  <td>{v.numero}</td>
                  <td><span className="tipo-pill interno">{v.tipo}</span></td>
                  <td>{v.cliente}</td>
                  <td>S/ {v.monto.toFixed(2)}</td>
                  <td><span className="estado-pill sin-comprobante">{v.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default SunatInterno;