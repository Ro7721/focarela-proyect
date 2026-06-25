package com.epiis.backfocarela.business;

import com.epiis.backfocarela.dto.request.RequestPedido;
import com.epiis.backfocarela.dto.response.ResponsePedido;
import com.epiis.backfocarela.model.Pedido;
import com.epiis.backfocarela.model.Usuario;
import com.epiis.backfocarela.model.Cliente;
import com.epiis.backfocarela.repository.PedidoRepo;
import com.epiis.backfocarela.repository.UsuarioRepo;
import com.epiis.backfocarela.repository.ClienteRepo;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BusinessPedido {

    private final PedidoRepo pedidoRepo;
    private final UsuarioRepo usuarioRepo;
    private final ClienteRepo clienteRepo;

    public BusinessPedido(PedidoRepo pedidoRepo, UsuarioRepo usuarioRepo, ClienteRepo clienteRepo) {
        this.pedidoRepo = pedidoRepo;
        this.usuarioRepo = usuarioRepo;
        this.clienteRepo = clienteRepo;
    }

    private ResponsePedido mapPedido(Pedido pedido) {
        ResponsePedido response = new ResponsePedido();
        response.success();
        response.setIdPedido(pedido.getIdPedido());
        response.setIdCliente(pedido.getCliente().getIdCliente());
        response.setIdUsuario(pedido.getUsuario().getIdUsuario());
        response.setFecha(pedido.getFecha());
        response.setEstado(pedido.getEstado());
        return response;
    }

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

        ResponsePedido response = mapPedido(pedido);
        response.addMessage("Pedido actualizado correctamente.");
        return response;
    }

    public void delete(String id) {
        Pedido pedido = pedidoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        pedidoRepo.delete(pedido);
    }
}
