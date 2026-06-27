package com.epiis.backfocarela.business;

import com.epiis.backfocarela.dto.request.RequestDetallePedido;
import com.epiis.backfocarela.dto.request.RequestPedido;
import com.epiis.backfocarela.dto.response.ResponseDetallePedido;
import com.epiis.backfocarela.dto.response.ResponsePedido;
import com.epiis.backfocarela.model.DetallePedido;
import com.epiis.backfocarela.model.Pedido;
import com.epiis.backfocarela.model.Producto;
import com.epiis.backfocarela.model.Usuario;
import com.epiis.backfocarela.model.Cliente;
import com.epiis.backfocarela.repository.DetallePedidoRepo;
import com.epiis.backfocarela.repository.PedidoRepo;
import com.epiis.backfocarela.repository.ProductoRepo;
import com.epiis.backfocarela.repository.UsuarioRepo;
import com.epiis.backfocarela.repository.ClienteRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BusinessPedido {

    private final PedidoRepo pedidoRepo;
    private final UsuarioRepo usuarioRepo;
    private final ClienteRepo clienteRepo;
    private final ProductoRepo productoRepo;
    private final DetallePedidoRepo detallePedidoRepo;

    public BusinessPedido(PedidoRepo pedidoRepo, UsuarioRepo usuarioRepo, ClienteRepo clienteRepo,
            ProductoRepo productoRepo, DetallePedidoRepo detallePedidoRepo) {
        this.pedidoRepo = pedidoRepo;
        this.usuarioRepo = usuarioRepo;
        this.clienteRepo = clienteRepo;
        this.productoRepo = productoRepo;
        this.detallePedidoRepo = detallePedidoRepo;
    }

    private ResponseDetallePedido mapDetalle(DetallePedido detalle) {
        ResponseDetallePedido response = new ResponseDetallePedido();
        response.setIdDetalle(detalle.getIdDetalle());
        response.setIdProducto(detalle.getProducto().getIdProducto());
        response.setProductoNombre(detalle.getProducto().getNombre());
        response.setPrecioUnitario(detalle.getProducto().getPrecio());
        response.setCantidad(detalle.getCantidad());
        response.setSubtotal(detalle.getProducto().getPrecio()
                .multiply(BigDecimal.valueOf(detalle.getCantidad())));
        return response;
    }

    private ResponsePedido mapPedido(Pedido pedido) {
        ResponsePedido response = new ResponsePedido();
        response.success();
        response.setIdPedido(pedido.getIdPedido());
        response.setIdCliente(pedido.getCliente().getIdCliente());
        response.setIdUsuario(pedido.getUsuario().getIdUsuario());
        response.setFecha(pedido.getFecha());
        response.setEstado(pedido.getEstado());

        List<ResponseDetallePedido> detalles = detallePedidoRepo
                .findByPedido_IdPedido(pedido.getIdPedido())
                .stream()
                .map(this::mapDetalle)
                .collect(Collectors.toList());

        response.setDetalles(detalles);
        response.setTotal(detalles.stream()
                .map(ResponseDetallePedido::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        return response;
    }

    private void guardarDetalles(Pedido pedido, List<RequestDetallePedido> detalles) {
        if (detalles == null) {
            return;
        }
        for (RequestDetallePedido item : detalles) {
            Producto producto = productoRepo.findById(item.getIdProducto())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + item.getIdProducto()));

            DetallePedido detalle = new DetallePedido();
            detalle.setIdDetalle(UUID.randomUUID().toString());
            detalle.setPedido(pedido);
            detalle.setProducto(producto);
            detalle.setCantidad(item.getCantidad());

            detallePedidoRepo.save(detalle);
        }
    }

    @Transactional
    public ResponsePedido insert(RequestPedido request) {
        Pedido pedido = new Pedido();
        pedido.setIdPedido(UUID.randomUUID().toString());

        Cliente cliente = clienteRepo.findById(request.getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        Usuario usuario = usuarioRepo.findById(request.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        pedido.setCliente(cliente);
        pedido.setUsuario(usuario);
        pedido.setFecha(LocalDateTime.now());
        pedido.setEstado(request.getEstado());

        pedidoRepo.save(pedido);

        guardarDetalles(pedido, request.getDetalles());

        ResponsePedido response = mapPedido(pedido);
        response.addMessage("Pedido registrado correctamente.");
        return response;
    }

    public List<ResponsePedido> getAll() {
        return pedidoRepo.findAll()
                .stream()
                .map(this::mapPedido)
                .collect(Collectors.toList());
    }

    public ResponsePedido getById(String id) {
        Pedido pedido = pedidoRepo.findById(id).orElse(null);
        if (pedido == null) {
            ResponsePedido response = new ResponsePedido();
            response.error();
            response.addMessage("El pedido no existe");
            return response;
        }
        return mapPedido(pedido);
    }

    @Transactional
    public ResponsePedido update(String id, RequestPedido request) {
        Pedido pedido = pedidoRepo.findById(id).orElse(null);
        if (pedido == null) {
            ResponsePedido response = new ResponsePedido();
            response.error();
            response.addMessage("El pedido no existe");
            return response;
        }

        Cliente cliente = clienteRepo.findById(request.getIdCliente())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        Usuario usuario = usuarioRepo.findById(request.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        pedido.setCliente(cliente);
        pedido.setUsuario(usuario);
        pedido.setEstado(request.getEstado());

        pedidoRepo.save(pedido);

        // Si vienen detalles nuevos, se reemplazan los anteriores
        if (request.getDetalles() != null) {
            detallePedidoRepo.deleteByPedido_IdPedido(pedido.getIdPedido());
            guardarDetalles(pedido, request.getDetalles());
        }

        ResponsePedido response = mapPedido(pedido);
        response.addMessage("Pedido actualizado correctamente.");
        return response;
    }

    @Transactional
    public void delete(String id) {
        Pedido pedido = pedidoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        detallePedidoRepo.deleteByPedido_IdPedido(id);
        pedidoRepo.delete(pedido);
    }
}
