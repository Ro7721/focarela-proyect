import { API_BASE_URL } from '../core/constants';

export async function obtenerPedidos() {
  const res = await fetch(`${API_BASE_URL}/pedidos`);
  return res.json();
}

export async function crearPedido(pedido) {
  const res = await fetch(`${API_BASE_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
  return res.json();
}