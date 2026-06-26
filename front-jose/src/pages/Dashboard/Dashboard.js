import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';
import Topbar from '../../components/Topbar';

const stats = [
  { value: 'S/ 155.00', label: 'Ventas Hoy', icon: '💰', badge: '+12% vs ayer', badgeType: 'green' },
  { value: '3', label: 'Pedidos Hoy', icon: '📋', badge: 'En tiempo real', badgeType: 'blue' },
  { value: '0', label: 'Stock Crítico', icon: '⚠️', badge: 'Todo OK', badgeType: 'gray' },
  { value: 'S/ 1550.00', label: 'Gastos del Mes', icon: '📉', badge: 'Controlado', badgeType: 'red' },
];

const ventasPorHora = [
  { hora: '11h', ventas: 0 },
  { hora: '12h', ventas: 65 },
  { hora: '13h', ventas: 155 },
  { hora: '14h', ventas: 0 },
  { hora: '15h', ventas: 0 },
  { hora: '16h', ventas: 0 },
  { hora: '17h', ventas: 0 },
  { hora: '18h', ventas: 0 },
  { hora: '19h', ventas: 0 },
  { hora: '20h', ventas: 0 },
  { hora: '21h', ventas: 0 },
  { hora: '22h', ventas: 0 },
];

const ultimosPedidos = [
  { id: 'P-003', cliente: 'Carlos Ruiz', total: 'S/ 35.00', estado: 'Listo' },
  { id: 'P-002', cliente: 'María López', total: 'S/ 76.00', estado: 'En Cocina' },
  { id: 'P-001', cliente: 'Juan Pérez', total: 'S/ 44.00', estado: 'Entregado' },
];

const inventarioCritico = [];

function Dashboard() {
  return (
    <main className="main-content">
      <Topbar titulo="Dashboard" />

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-top">
              <div className="stat-text">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <span className={`badge badge-${stat.badgeType}`}>{stat.badge}</span>
          </div>
        ))}
      </section>

      <section className="content-grid">
        <div className="card chart-card">
          <h3>Ventas por Hora - Hoy</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ventasPorHora}>
              <defs>
                <linearGradient id="orangeBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF7A45" />
                  <stop offset="100%" stopColor="#D32F2F" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="ventas" fill="url(#orangeBar)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card pedidos-card">
          <h3>Últimos 5 Pedidos</h3>
          <table className="pedidos-table">
            <thead>
              <tr>
                <th>PEDIDO</th>
                <th>CLIENTE</th>
                <th>TOTAL</th>
                <th>ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {ultimosPedidos.map((p) => (
                <tr key={p.id}>
                  <td className="pedido-id">{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{p.total}</td>
                  <td>
                    <span className={`estado-badge ${p.estado.replace(/\s/g, '-').toLowerCase()}`}>
                      {p.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card inventario-card">
        <h3>Inventario Crítico (RF39 - Tiempo Real)</h3>
        {inventarioCritico.length === 0 ? (
          <p className="inventario-ok">✓ Todos los insumos por encima del mínimo</p>
        ) : (
          <ul className="inventario-list">
            {inventarioCritico.map((item, i) => (
              <li key={i}>
                <span>{item.nombre}</span>
                <span className="stock-badge">{item.stock} {item.unidad}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Dashboard;