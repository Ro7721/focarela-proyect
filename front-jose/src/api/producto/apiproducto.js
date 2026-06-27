import api from "../axiosClient";

const RUTA = "/producto";

export async function listarProductos() {
  const { data } = await api.get(`${RUTA}/listar`);
  return data;
}

export async function buscarProductoPorId(idProducto) {
  const { data } = await api.get(`${RUTA}/buscar/${idProducto}`);
  return data;
}

export async function buscarProductosPorNombre(nombre) {
  const { data } = await api.get(`${RUTA}/buscar`, { params: { nombre } });
  return data;
}

export async function listarProductosPorCategoria(idCategoria) {
  const { data } = await api.get(`${RUTA}/categoria/${idCategoria}`);
  return data;
}

export async function crearProducto(producto) {
  // producto: { idCategoria, nombre, descripcion, precio, imagen, estado }
  const { data } = await api.post(`${RUTA}/insertar`, producto);
  return data;
}

export async function actualizarProducto(idProducto, producto) {
  const { data } = await api.put(`${RUTA}/actualizar/${idProducto}`, producto);
  return data;
}

export async function eliminarProducto(idProducto) {
  // Eliminación lógica: el backend pone estado = false
  const { data } = await api.delete(`${RUTA}/eliminar/${idProducto}`);
  return data;
}
