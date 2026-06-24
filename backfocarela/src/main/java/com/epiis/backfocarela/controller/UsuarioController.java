package com.epiis.backfocarela.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.epiis.backfocarela.business.BusinessUsuario;
import com.epiis.backfocarela.dto.request.RequestUsuario;
import com.epiis.backfocarela.dto.response.ResponseUsuario;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(path = "usuario")
public class UsuarioController {
    private final BusinessUsuario businessUsuario;

    public UsuarioController(BusinessUsuario businessUsuario) {
        this.businessUsuario = businessUsuario;
    }

    // Crear
    @PostMapping("/registrar")
    public ResponseEntity<ResponseUsuario> registrar(@RequestBody RequestUsuario request) {

        return ResponseEntity.ok(businessUsuario.insert(request));
    }

    // Listar
    @GetMapping("/listar")
    public ResponseEntity<List<ResponseUsuario>> listar() {

        return ResponseEntity.ok(businessUsuario.getAll());
    }

    // Buscar por id
    @GetMapping("/{idUsuario}")
    public ResponseEntity<ResponseUsuario> buscarPorId(
            @PathVariable String idUsuario) {

        return ResponseEntity.ok(businessUsuario.getById(idUsuario));
    }

    // Buscar por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<ResponseUsuario>> buscar(
            @RequestParam String nombre) {

        return ResponseEntity.ok(businessUsuario.search(nombre));
    }

    // Actualizar
    @PutMapping("/{idUsuario}")
    public ResponseEntity<ResponseUsuario> actualizar(
            @PathVariable String idUsuario,
            @RequestBody RequestUsuario request) {

        return ResponseEntity.ok(businessUsuario.update(idUsuario, request));
    }

    // Eliminar
    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<String> eliminar(
            @PathVariable String idUsuario) {

        businessUsuario.delete(idUsuario);

        return ResponseEntity.ok("Usuario eliminado correctamente.");
    }

}
