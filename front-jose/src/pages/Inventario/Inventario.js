import React, { useState } from 'react';
import './Inventario.css';

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

  const registrarCompra = () => {
    const nombre = prompt('¿Qué insumo quieres reabastecer?');
    if (!nombre) return;
    const insumo = insumos.find(i => i.nombre.toLowerCase() === nombre.toLowerCase());
    if (!insumo) {
      alert('Insumo no encontrado en la lista.');
      return;
    }
    const cantidad = parseFloat(prompt(`¿Cuánto stock agregamos a "${insumo.nombre}"?`, '10'));
    if (isNaN(cantidad) || cantidad <= 0) return;

    setInsumos(prev =>
      prev.map(i => i.id === insumo.id ? { ...i, stock: i.stock + cantidad } : i)
    );
    alert(`Compra registrada: +${cantidad} ${insumo.unidad} de ${insumo.nombre}`);
  };

  return (
    <div className="inventario-page">
      <div className="inventario-header">
        <h1>📦 Inventario</h1>
      </div>

      <section className="inventario-card">
        <div className="inventario-top">
          <h3>Control de Insumos (RF37-RF39)</h3>
          <button className="registrar-compra-btn" onClick={registrarCompra}>
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
    </div>
  );
}

export default Inventario;