import api from "../axiosClient";

const RUTA = "/pedido";

export async function listarPedidos() {
  const { data } = await api.get(`${RUTA}/listar`);
  return data;
}

export async function buscarPedidoPorId(idPedido) {
  const { data } = await api.get(`${RUTA}/buscar/${idPedido}`);
  return data;
}

export async function crearPedido(pedido) {
  // pedido: { idCliente, idUsuario, estado, detalles: [{ idProducto, cantidad }] }
  const { data } = await api.post(`${RUTA}/insertar`, pedido);
  return data;
}

export async function actualizarPedido(idPedido, pedido) {
  // pedido: { idCliente, idUsuario, estado, detalles: [{ idProducto, cantidad }] }
  const { data } = await api.put(`${RUTA}/actualizar/${idPedido}`, pedido);
  return data;
}

export async function eliminarPedido(idPedido) {
  const { data } = await api.delete(`${RUTA}/eliminar/${idPedido}`);
  return data;
}
