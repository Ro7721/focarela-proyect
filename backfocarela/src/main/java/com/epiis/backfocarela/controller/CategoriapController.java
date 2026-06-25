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

import com.epiis.backfocarela.business.BusinessCategoria;
import com.epiis.backfocarela.dto.request.RequestCategoria;
import com.epiis.backfocarela.dto.response.ResponseCategoria;

@RestController
@RequestMapping(path = "categoria")
public class CategoriapController {
    private final BusinessCategoria businessCategoria;

    public CategoriapController(BusinessCategoria businessCategoria) {
        this.businessCategoria = businessCategoria;
    }

    @GetMapping(path = "listar")
    public ResponseEntity<List<ResponseCategoria>> getAll() {
        return ResponseEntity.ok(businessCategoria.getAll());
    }

    @PostMapping(path = "insertar")
    public ResponseEntity<ResponseCategoria> insert(@RequestBody RequestCategoria request) {
        return ResponseEntity.ok(businessCategoria.insert(request));
    }

    @PutMapping(path = "actualizar/{idCategoria}")
    public ResponseEntity<ResponseCategoria> update(@PathVariable("idCategoria") String idCategoria,
            @RequestBody RequestCategoria request) {
        return ResponseEntity.ok(businessCategoria.update(idCategoria, request));
    }

    @DeleteMapping(path = "eliminar/{idCategoria}")
    public ResponseEntity<Void> delete(@PathVariable("idCategoria") String idCategoria) {
        businessCategoria.delete(idCategoria);
        return ResponseEntity.noContent().build();
    }

}
