import React, { useState } from 'react';
import './Pedidos.css';
import Topbar from '../../components/Topbar';

const productos = [
  { id: 1, nombre: 'Pizza Americana', precio: 32.00, icono: '🍕' },
  { id: 2, nombre: 'Pizza Hawaiana', precio: 35.00, icono: '🍍' },
  { id: 3, nombre: 'Pizza Pepperoni', precio: 38.00, icono: '🍕' },
  { id: 4, nombre: 'Calzone', precio: 28.00, icono: '🥟' },
  { id: 5, nombre: 'Inka Kola 1.5L', precio: 12.00, icono: '🥤' },
];

function Pedidos() {
  const [vista, setVista] = useState('nuevo');
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState('');
  const [tipo, setTipo] = useState('Salón');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [comprobante, setComprobante] = useState('Boleta');

  const agregarProducto = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarProducto = (id) => {
    setCarrito(prev => prev.filter(p => p.id !== id));
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  const registrarPedido = () => {
    if (carrito.length === 0) {
      alert('Agrega al menos un producto al carrito');
      return;
    }
    if (!cliente.trim()) {
      alert('Ingresa el nombre del cliente');
      return;
    }
    alert(`Pedido registrado para ${cliente}\nTotal: S/ ${total.toFixed(2)}`);
    setCarrito([]);
    setCliente('');
  };

  return (
    <div className="pedidos-page">
      <Topbar titulo="🍕 Pedidos" />

      <div className="pedidos-tabs">
        <span className={vista === 'nuevo' ? 'tab activo' : 'tab'} onClick={() => setVista('nuevo')}>
          Nuevo Pedido
        </span>
        <span className={vista === 'activos' ? 'tab activo' : 'tab'} onClick={() => setVista('activos')}>
          Pedidos Activos
        </span>
      </div>

      {vista === 'nuevo' ? (
        <div className="pedidos-grid">
          <div className="menu-card">
            <h3>Menú - Seleccionar Productos</h3>
            <div className="productos-grid">
              {productos.map(p => (
                <div key={p.id} className="producto-card" onClick={() => agregarProducto(p)}>
                  <div className="producto-icono">{p.icono}</div>
                  <div className="producto-nombre">{p.nombre}</div>
                  <div className="producto-precio">S/ {p.precio.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="carrito-card">
            <h3>Carrito</h3>
            {carrito.length === 0 ? (
              <p className="carrito-vacio">Carrito vacío</p>
            ) : (
              <div className="carrito-lista">
                {carrito.map(p => (
                  <div key={p.id} className="carrito-item">
                    <span>{p.cantidad}x {p.nombre}</span>
                    <span>
                      S/ {(p.precio * p.cantidad).toFixed(2)}
                      <button className="quitar-btn" onClick={() => quitarProducto(p.id)}>✕</button>
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div className="carrito-total">Total: S/ {total.toFixed(2)}</div>
            <div className="form-row">
              <div className="form-field">
                <label>Cliente</label>
                <input type="text" placeholder="Nombre cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
              </div>
              <div className="form-field">
                <label>Tipo</label>
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                  <option>Salón</option>
                  <option>Para llevar</option>
                  <option>Delivery</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Método Pago</label>
                <select value={metodoPago} onChange={e => setMetodoPago(e.target.value)}>
                  <option>Efectivo</option>
                  <option>Tarjeta</option>
                  <option>Yape/Plin</option>
                </select>
              </div>
              <div className="form-field">
                <label>Comprobante</label>
                <select value={comprobante} onChange={e => setComprobante(e.target.value)}>
                  <option>Boleta</option>
                  <option>Factura</option>
                </select>
              </div>
            </div>
            <button className="registrar-btn" onClick={registrarPedido}>
              🍕 Registrar Pedido
            </button>
            <p className="registrar-nota">Al registrar: se crea ingreso en caja y actualiza inventario</p>
          </div>
        </div>
      ) : (
        <div className="menu-card">
          <p>no hay datos cargados </p>
        </div>
      )}
    </div>
  );
}

export default Pedidos;