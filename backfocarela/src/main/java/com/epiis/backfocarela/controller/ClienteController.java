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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.backfocarela.business.BusinessCliente;
import com.epiis.backfocarela.dto.request.RequestCliente;
import com.epiis.backfocarela.dto.response.ResponseCliente;

@RestController
@RequestMapping(path = "cliente")
public class ClienteController {

    private final BusinessCliente businessCliente;

    public ClienteController(BusinessCliente businessCliente) {
        this.businessCliente = businessCliente;
    }

    // Crear
    @PostMapping(path = "insertar")
    public ResponseEntity<ResponseCliente> insertar(
            @RequestBody RequestCliente request) {

        return ResponseEntity.ok(businessCliente.insert(request));
    }

    // Listar todos
    @GetMapping(path = "listar")
    public ResponseEntity<List<ResponseCliente>> listar() {

        return ResponseEntity.ok(businessCliente.getAll());
    }

    // Buscar por ID
    @GetMapping(path = "buscar/{idCliente}")
    public ResponseEntity<ResponseCliente> buscarPorId(
            @PathVariable String idCliente) {

        return ResponseEntity.ok(businessCliente.getById(idCliente));
    }

    // Buscar por nombre
    @GetMapping(path = "buscar")
    public ResponseEntity<List<ResponseCliente>> buscar(
            @RequestParam String nombre) {

        return ResponseEntity.ok(businessCliente.search(nombre));
    }

    // Actualizar
    @PutMapping(path = "actualizar/{idCliente}")
    public ResponseEntity<ResponseCliente> actualizar(
            @PathVariable String idCliente,
            @RequestBody RequestCliente request) {

        return ResponseEntity.ok(businessCliente.update(idCliente, request));
    }

    // Eliminar
    @DeleteMapping(path = "eliminar/{idCliente}")
    public ResponseEntity<String> eliminar(
            @PathVariable String idCliente) {

        businessCliente.delete(idCliente);

        return ResponseEntity.ok("Cliente eliminado correctamente.");
    }

}
