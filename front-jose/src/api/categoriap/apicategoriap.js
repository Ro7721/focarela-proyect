import api from "../axiosClient";

const RUTA = "/categoria";

export async function listarCategorias() {
  const { data } = await api.get(`${RUTA}/listar`);
  return data;
}

export async function crearCategoria(categoria) {
  // categoria: { nombre, descripcion }
  const { data } = await api.post(`${RUTA}/insertar`, categoria);
  return data;
}

export async function actualizarCategoria(idCategoria, categoria) {
  const { data } = await api.put(`${RUTA}/actualizar/${idCategoria}`, categoria);
  return data;
}

export async function eliminarCategoria(idCategoria) {
  const { data } = await api.delete(`${RUTA}/eliminar/${idCategoria}`);
  return data;
}
