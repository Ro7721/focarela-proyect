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

import com.epiis.backfocarela.business.BusinessInventario;
import com.epiis.backfocarela.dto.request.RequestInventario;
import com.epiis.backfocarela.dto.response.ResponseInventario;

@RestController
@RequestMapping(path = "inventario")
public class InventarioController {

    private final BusinessInventario businessInventario;

    public InventarioController(BusinessInventario businessInventario) {
        this.businessInventario = businessInventario;
    }

    // Crear
    @PostMapping(path = "insertar")
    public ResponseEntity<ResponseInventario> insertar(
            @RequestBody RequestInventario request) {

        return ResponseEntity.ok(businessInventario.insert(request));
    }

    // Listar todos
    @GetMapping(path = "listar")
    public ResponseEntity<List<ResponseInventario>> listar() {

        return ResponseEntity.ok(businessInventario.getAll());
    }

    // Buscar por ID
    @GetMapping(path = "buscar/{idInventario}")
    public ResponseEntity<ResponseInventario> buscarPorId(
            @PathVariable String idInventario) {

        return ResponseEntity.ok(businessInventario.getById(idInventario));
    }

    // Actualizar
    @PutMapping(path = "actualizar/{idInventario}")
    public ResponseEntity<ResponseInventario> actualizar(
            @PathVariable String idInventario,
            @RequestBody RequestInventario request) {

        return ResponseEntity.ok(businessInventario.update(idInventario, request));
    }

    // Eliminar
    @DeleteMapping(path = "eliminar/{idInventario}")
    public ResponseEntity<String> eliminar(
            @PathVariable String idInventario) {

        businessInventario.delete(idInventario);

        return ResponseEntity.ok("Insumo eliminado correctamente.");
    }

}
