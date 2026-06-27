package com.epiis.backfocarela.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.DetallePedido;

public interface DetallePedidoRepo extends JpaRepository<DetallePedido, String> {

    List<DetallePedido> findByPedido_IdPedido(String idPedido);

    void deleteByPedido_IdPedido(String idPedido);
}
