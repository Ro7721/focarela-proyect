import React, { useEffect, useState } from 'react';
import './Pedidos.css';
import { listarProductos } from '../../api/producto/apiproducto';
import { listarClientes } from '../../api/cliente/apicliente';
import { crearPedido, listarPedidos } from '../../api/pedido/apipedido';
import { useAuth } from '../../context/AuthContext';

function Pedidos() {
  const { usuario } = useAuth();

  const [vista, setVista] = useState('nuevo');
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [pedidosActivos, setPedidosActivos] = useState([]);

  const [carrito, setCarrito] = useState([]);
  const [idCliente, setIdCliente] = useState('');
  const [tipo, setTipo] = useState('Salón');
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [comprobante, setComprobante] = useState('Boleta');

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  async function cargarDatosIniciales() {
    setCargando(true);
    setError(null);
    try {
      const [productosData, clientesData] = await Promise.all([
        listarProductos(),
        listarClientes(),
      ]);
      setProductos((productosData || []).filter(p => p.estado));
      setClientes(clientesData || []);
    } catch (err) {
      setError('No se pudo conectar con el backend. ¿Está corriendo en el puerto 8080?');
      console.error(err);
    } finally {
      setCargando(false);
    }
  }

  async function cargarPedidosActivos() {
    try {
      const data = await listarPedidos();
      setPedidosActivos(data || []);
    } catch (err) {
      console.error(err);
    }
  }

  const agregarProducto = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.idProducto === producto.idProducto);
      if (existe) {
        return prev.map(p =>
          p.idProducto === producto.idProducto ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const quitarProducto = (idProducto) => {
    setCarrito(prev => prev.filter(p => p.idProducto !== idProducto));
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  async function registrarPedido() {
    if (carrito.length === 0) {
      alert('Agrega al menos un producto al carrito');
      return;
    }
    if (!idCliente) {
      alert('Selecciona un cliente');
      return;
    }
    if (!usuario) {
      alert('No hay un usuario con sesión iniciada.');
      return;
    }

    setEnviando(true);
    try {
      await crearPedido({
        idCliente,
        idUsuario: usuario.idUsuario,
        estado: 'Pendiente',
        detalles: carrito.map(p => ({
          idProducto: p.idProducto,
          cantidad: p.cantidad,
        })),
      });

      alert(`Pedido registrado.\nTotal: S/ ${total.toFixed(2)}`);

      // Guardar movimiento en caja
      const movimientosCaja = JSON.parse(localStorage.getItem('movimientos_caja') || '[]');
      movimientosCaja.push({
        hora: new Date().toLocaleTimeString('es-PE'),
        pedido: new Date().getTime(),
        concepto: carrito.map(p => `${p.cantidad}x ${p.nombre}`).join(', '),
        metodo: metodoPago,
        monto: total
      });
      localStorage.setItem('movimientos_caja', JSON.stringify(movimientosCaja));

      setCarrito([]);
      setIdCliente('');
    } catch (err) {
      alert(`No se pudo registrar el pedido: ${err.message}`);
    } finally {
      setEnviando(false);
    }
  }

  function cambiarVista(nuevaVista) {
    setVista(nuevaVista);
    if (nuevaVista === 'activos') {
      cargarPedidosActivos();
    }
  }

  return (
    <div className="pedidos-page">
      <div className="pedidos-header">
        <h1>🍕 Pedidos</h1>
      </div>

      <div className="pedidos-tabs">
        <span
          className={vista === 'nuevo' ? 'tab activo' : 'tab'}
          onClick={() => cambiarVista('nuevo')}
        >
          Nuevo Pedido
        </span>
        <span
          className={vista === 'activos' ? 'tab activo' : 'tab'}
          onClick={() => cambiarVista('activos')}
        >
          Pedidos Activos
        </span>
      </div>

      {cargando && <p>Cargando productos y clientes...</p>}
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}

      {!cargando && !error && vista === 'nuevo' && (
        <div className="pedidos-grid">
          <div className="menu-card">
            <h3>Menú - Seleccionar Productos</h3>
            <div className="productos-grid">
              {productos.map(p => (
                <div key={p.idProducto} className="producto-card" onClick={() => agregarProducto(p)}>
                  <div className="producto-icono">🍕</div>
                  <div className="producto-nombre">{p.nombre}</div>
                  <div className="producto-precio">S/ {Number(p.precio).toFixed(2)}</div>
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
                  <div key={p.idProducto} className="carrito-item">
                    <span>{p.cantidad}x {p.nombre}</span>
                    <span>
                      S/ {(p.precio * p.cantidad).toFixed(2)}
                      <button className="quitar-btn" onClick={() => quitarProducto(p.idProducto)}>✕</button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="carrito-total">Total: S/ {total.toFixed(2)}</div>

            <div className="form-row">
              <div className="form-field">
                <label>Cliente</label>
                <select value={idCliente} onChange={e => setIdCliente(e.target.value)}>
                  <option value="">Selecciona un cliente</option>
                  {clientes.map(c => (
                    <option key={c.idCliente} value={c.idCliente}>{c.nombre}</option>
                  ))}
                </select>
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

            <button className="registrar-btn" onClick={registrarPedido} disabled={enviando}>
              {enviando ? 'Registrando...' : '🍕 Registrar Pedido'}
            </button>
            <p className="registrar-nota">
              Al registrar: se crea el pedido con sus productos en el backend
            </p>
          </div>
        </div>
      )}

      {!cargando && !error && vista === 'activos' && (
        <div className="menu-card">
          {pedidosActivos.length === 0 ? (
            <p>No hay pedidos registrados.</p>
          ) : (
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>FECHA</th>
                  <th>ESTADO</th>
                  <th>PRODUCTOS</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {pedidosActivos.map(p => (
                  <tr key={p.idPedido}>
                    <td>{new Date(p.fecha).toLocaleString()}</td>
                    <td>{p.estado}</td>
                    <td>
                      {(p.detalles || []).map(d => `${d.cantidad}x ${d.productoNombre}`).join(', ')}
                    </td>
                    <td>S/ {Number(p.total || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Pedidos;