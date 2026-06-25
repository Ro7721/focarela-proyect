package com.epiis.backfocarela.business;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.epiis.backfocarela.dto.request.RequestCategoria;
import com.epiis.backfocarela.dto.response.ResponseCategoria;
import com.epiis.backfocarela.message.GenericResponse;
import com.epiis.backfocarela.model.Categoria;
import com.epiis.backfocarela.repository.CategoriapRepo;

@Service
public class BusinessCategoria {

    private final CategoriapRepo categoriapRepo;

    public BusinessCategoria(CategoriapRepo categoriapRepo) {
        this.categoriapRepo = categoriapRepo;
    }

    public List<ResponseCategoria> getAll() {

        return categoriapRepo.findAll()
                .stream()
                .map(this::mapCategoria)
                .collect(Collectors.toList());
    }

    private ResponseCategoria mapCategoria(Categoria categoria) {

        ResponseCategoria response = new ResponseCategoria();

        response.setIdCategoria(categoria.getIdCategoria());
        response.setNombre(categoria.getNombre());
        response.setDescripcion(categoria.getDescripcion());

        return response;
    }

    public ResponseCategoria insert(RequestCategoria request) {
        GenericResponse response = new GenericResponse();
        if (categoriapRepo.existsByNombre(request.getNombre())) {
            response.warning();
            response.addMessage("La categoria ya existe");
            return null;
        }
        Categoria categoria = new Categoria();

        categoria.setIdCategoria(UUID.randomUUID().toString());
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());

        categoriapRepo.save(categoria);
        response.success();
        response.addMessage("Categoria registrada correctamente.");
        return mapCategoria(categoria);
    }

    public ResponseCategoria update(String id, RequestCategoria request) {
        GenericResponse response = new GenericResponse();
        Categoria categoria = categoriapRepo.findById(id).get();
        if (categoria == null) {
            response.error();
            response.addMessage("La categoria no existe");
            return null;
        }
        categoria.setNombre(request.getNombre());
        categoria.setDescripcion(request.getDescripcion());
        categoriapRepo.save(categoria);
        response.success();
        response.addMessage("Categoria actualizada correctamente.");
        return mapCategoria(categoria);
    }

    public boolean delete(String id) {
        GenericResponse response = new GenericResponse();
        Categoria categoria = categoriapRepo.findById(id).get();
        if (categoria == null) {
            response.error();
            response.addMessage("La categoria no existe");
            return false;
        }
        categoriapRepo.delete(categoria);
        response.success();
        response.addMessage("Categoria eliminada correctamente.");
        return true;
    }

}
