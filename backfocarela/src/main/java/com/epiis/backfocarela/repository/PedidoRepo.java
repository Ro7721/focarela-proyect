package com.epiis.backfocarela.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.Pedido;

public interface PedidoRepo extends JpaRepository<Pedido, String> {

    List<Pedido> findAll();

    List<Pedido> findByEstado(String estado);

    List<Pedido> findByEstadoContainingIgnoreCase(String estado);

    List<Pedido> findByCliente_IdCliente(String idCliente);

    List<Pedido> findByUsuario_IdUsuario(String idUsuario);

    Optional<Pedido> findByIdPedido(String idPedido);
}
