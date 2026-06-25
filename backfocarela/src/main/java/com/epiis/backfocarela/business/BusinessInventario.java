package com.epiis.backfocarela.business;

import com.epiis.backfocarela.dto.request.RequestInventario;
import com.epiis.backfocarela.dto.response.ResponseInventario;
import com.epiis.backfocarela.model.Inventario;
import com.epiis.backfocarela.repository.InventarioRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BusinessInventario {

    private final InventarioRepo inventarioRepo;

    public BusinessInventario(InventarioRepo inventarioRepo) {
        this.inventarioRepo = inventarioRepo;
    }

    private ResponseInventario mapInventario(Inventario inventario) {
        ResponseInventario response = new ResponseInventario();
        response.success();
        response.setIdInventario(inventario.getIdInventario());
        response.setNombreInsumo(inventario.getNombreInsumo());
        response.setCantidad(inventario.getCantidad());
        response.setUnidadMedida(inventario.getUnidadMedida());
        response.setStockMinimo(inventario.getStockMinimo());
        return response;
    }

    public ResponseInventario insert(RequestInventario request) {
        Inventario inventario = new Inventario();
        inventario.setIdInventario(UUID.randomUUID().toString());
        inventario.setNombreInsumo(request.getNombreInsumo());
        inventario.setCantidad(request.getCantidad());
        inventario.setUnidadMedida(request.getUnidadMedida());
        inventario.setStockMinimo(request.getStockMinimo());

        inventarioRepo.save(inventario);

        ResponseInventario response = mapInventario(inventario);
        response.addMessage("Insumo registrado correctamente.");
        return response;
    }

    public List<ResponseInventario> getAll() {
        return inventarioRepo.findAll()
                .stream()
                .map(this::mapInventario)
                .collect(Collectors.toList());
    }

    public ResponseInventario getById(String id) {
        Inventario inventario = inventarioRepo.findById(id).orElse(null);
        if (inventario == null) {
            ResponseInventario response = new ResponseInventario();
            response.error();
            response.addMessage("El insumo no existe");
            return response;
        }
        return mapInventario(inventario);
    }

    public ResponseInventario update(String id, RequestInventario request) {
        Inventario inventario = inventarioRepo.findById(id).orElse(null);
        if (inventario == null) {
            ResponseInventario response = new ResponseInventario();
            response.error();
            response.addMessage("El insumo no existe");
            return response;
        }

        inventario.setNombreInsumo(request.getNombreInsumo());
        inventario.setCantidad(request.getCantidad());
        inventario.setUnidadMedida(request.getUnidadMedida());
        inventario.setStockMinimo(request.getStockMinimo());

        inventarioRepo.save(inventario);

        ResponseInventario response = mapInventario(inventario);
        response.addMessage("Insumo actualizado correctamente.");
        return response;
    }

    public void delete(String id) {
        Inventario inventario = inventarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Insumo no encontrado"));
        inventarioRepo.delete(inventario);
    }
}
