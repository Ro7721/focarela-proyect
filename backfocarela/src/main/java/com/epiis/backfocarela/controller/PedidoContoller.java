package com.epiis.backfocarela.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.backfocarela.business.BusinessPedido;
import com.epiis.backfocarela.dto.request.RequestPedido;
import com.epiis.backfocarela.dto.response.ResponsePedido;

@RestController
@RequestMapping(path = "pedido")
public class PedidoContoller {

    private final BusinessPedido businessPedido;

    public PedidoContoller(BusinessPedido businessPedido) {
        this.businessPedido = businessPedido;
    }

    // Crear
    @PostMapping(path = "insertar")
    public ResponseEntity<ResponsePedido> insertar(
            @RequestBody RequestPedido request) {

        return ResponseEntity.ok(businessPedido.insert(request));
    }

    // Listar todos
    @GetMapping(path = "listar")
    public ResponseEntity<List<ResponsePedido>> listar() {

        return ResponseEntity.ok(businessPedido.getAll());
    }

    // Buscar por ID
    @GetMapping(path = "buscar/{idPedido}")
    public ResponseEntity<ResponsePedido> buscarPorId(
            @PathVariable String idPedido) {

        return ResponseEntity.ok(businessPedido.getById(idPedido));
    }

    // Actualizar
    @PutMapping(path = "actualizar/{idPedido}")
    public ResponseEntity<ResponsePedido> actualizar(
            @PathVariable String idPedido,
            @RequestBody RequestPedido request) {

        return ResponseEntity.ok(businessPedido.update(idPedido, request));
    }

    // Eliminar
    @DeleteMapping(path = "eliminar/{idPedido}")
    public ResponseEntity<String> eliminar(
            @PathVariable String idPedido) {

        businessPedido.delete(idPedido);

        return ResponseEntity.ok("Pedido eliminado correctamente.");
    }

}
