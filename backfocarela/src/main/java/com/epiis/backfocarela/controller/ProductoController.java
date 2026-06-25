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

import com.epiis.backfocarela.business.BusinessProducto;
import com.epiis.backfocarela.dto.request.RequestProducto;
import com.epiis.backfocarela.dto.response.ResponseProducto;
import com.epiis.backfocarela.message.GenericResponse;

@RestController
@RequestMapping(path = "producto")
public class ProductoController {

    private final BusinessProducto businessProducto;

    public ProductoController(BusinessProducto businessProducto) {
        this.businessProducto = businessProducto;
    }

    // Crear
    @PostMapping(path = "insertar")
    public ResponseEntity<ResponseProducto> insertar(
            @RequestBody RequestProducto request) {

        return ResponseEntity.ok(businessProducto.insert(request));
    }

    // Listar todos
    @GetMapping(path = "listar")
    public ResponseEntity<List<ResponseProducto>> listar() {

        return ResponseEntity.ok(businessProducto.getAll());
    }

    // Buscar por ID
    @GetMapping(path = "buscar/{idProducto}")
    public ResponseEntity<ResponseProducto> buscarPorId(
            @PathVariable String idProducto) {

        return ResponseEntity.ok(businessProducto.getById(idProducto));
    }

    // Buscar por nombre
    @GetMapping(path = "buscar")
    public ResponseEntity<List<ResponseProducto>> buscar(
            @RequestParam String nombre) {

        return ResponseEntity.ok(businessProducto.search(nombre));
    }

    // Buscar por categoría
    @GetMapping(path = "categoria/{idCategoria}")
    public ResponseEntity<List<ResponseProducto>> listarPorCategoria(
            @PathVariable String idCategoria) {

        return ResponseEntity.ok(
                businessProducto.getByCategoria(idCategoria));
    }

    // Actualizar
    @PutMapping(path = "actualizar/{idProducto}")
    public ResponseEntity<ResponseProducto> actualizar(
            @PathVariable String idProducto,
            @RequestBody RequestProducto request) {

        return ResponseEntity.ok(
                businessProducto.update(idProducto, request));
    }

    // Eliminar (lógico)
    @DeleteMapping(path = "eliminar/{idProducto}")
    public ResponseEntity<GenericResponse> eliminar(
            @PathVariable String idProducto) {

        return ResponseEntity.ok(
                businessProducto.delete(idProducto));
    }

}
