import api from "../axiosClient";

const RUTA = "/cliente";

export async function listarClientes() {
  const { data } = await api.get(`${RUTA}/listar`);
  return data;
}

export async function buscarClientePorId(idCliente) {
  const { data } = await api.get(`${RUTA}/buscar/${idCliente}`);
  return data;
}

export async function buscarClientesPorNombre(nombre) {
  const { data } = await api.get(`${RUTA}/buscar`, { params: { nombre } });
  return data;
}

export async function crearCliente(cliente) {
  // cliente: { nombre, telefono, correo, direccion }
  const { data } = await api.post(`${RUTA}/insertar`, cliente);
  return data;
}

export async function actualizarCliente(idCliente, cliente) {
  const { data } = await api.put(`${RUTA}/actualizar/${idCliente}`, cliente);
  return data;
}

export async function eliminarCliente(idCliente) {
  const { data } = await api.delete(`${RUTA}/eliminar/${idCliente}`);
  return data;
}
