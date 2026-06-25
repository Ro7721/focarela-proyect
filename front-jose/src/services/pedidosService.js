export function calcularTotal(carrito) {
  return carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
}