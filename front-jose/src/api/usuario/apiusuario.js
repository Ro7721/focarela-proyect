import api from "../axiosClient";

const RUTA = "/usuario";

export async function login(correo, password) {
  const { data } = await api.post(`${RUTA}/login`, { correo, password });
  return data;
}

export async function listarUsuarios() {
  const { data } = await api.get(`${RUTA}/listar`);
  return data;
}

export async function crearUsuario(usuario) {
  // usuario: { nombre, apellido, correo, password, rol, estado }
  const { data } = await api.post(`${RUTA}/insertar`, usuario);
  return data;
}

export async function actualizarUsuario(idUsuario, usuario) {
  const { data } = await api.put(`${RUTA}/actualizar/${idUsuario}`, usuario);
  return data;
}

export async function eliminarUsuario(idUsuario) {
  const { data } = await api.delete(`${RUTA}/eliminar/${idUsuario}`);
  return data;
}
