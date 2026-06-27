package com.epiis.backfocarela.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.backfocarela.business.BusinessPedido;
import com.epiis.backfocarela.dto.response.ResponsePedido;

@RestController
@RequestMapping(path = "pedido")
public class DetallePedidoController {

    private final BusinessPedido businessPedido;

    public DetallePedidoController(BusinessPedido businessPedido) {
        this.businessPedido = businessPedido;
    }

    // Reutiliza /pedido/buscar/{idPedido}, que ya incluye los detalles
    // dentro de ResponsePedido.detalles. Este endpoint queda como alias
    // semántico si se prefiere consumir solo la lista de productos.
    @GetMapping(path = "{idPedido}/detalle")
    public ResponseEntity<List<?>> detalle(@PathVariable String idPedido) {
        ResponsePedido pedido = businessPedido.getById(idPedido);
        return ResponseEntity.ok(pedido.getDetalles());
    }
}
