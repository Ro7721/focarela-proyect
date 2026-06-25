package com.epiis.backfocarela.business;

import com.epiis.backfocarela.dto.request.RequestCliente;
import com.epiis.backfocarela.dto.response.ResponseCliente;
import com.epiis.backfocarela.model.Cliente;
import com.epiis.backfocarela.repository.ClienteRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BusinessCliente {

    private final ClienteRepo clienteRepo;

    public BusinessCliente(ClienteRepo clienteRepo) {
        this.clienteRepo = clienteRepo;
    }

    private ResponseCliente mapCliente(Cliente cliente) {
        ResponseCliente response = new ResponseCliente();
        response.success();
        response.setIdCliente(cliente.getIdCliente());
        response.setNombre(cliente.getNombre());
        response.setTelefono(cliente.getTelefono());
        response.setCorreo(cliente.getCorreo());
        response.setDireccion(cliente.getDireccion());
        return response;
    }

    // INSERTAR
    public ResponseCliente insert(RequestCliente request) {
        Cliente cliente = new Cliente();
        cliente.setIdCliente(UUID.randomUUID().toString());
        cliente.setNombre(request.getNombre());
        cliente.setTelefono(request.getTelefono());
        cliente.setCorreo(request.getCorreo());
        cliente.setDireccion(request.getDireccion());

        clienteRepo.save(cliente);

        ResponseCliente response = mapCliente(cliente);
        response.addMessage("Cliente registrado correctamente.");
        return response;
    }

    public List<ResponseCliente> getAll() {
        return clienteRepo.findAll()
                .stream()
                .map(this::mapCliente)
                .collect(Collectors.toList());
    }

    public ResponseCliente getById(String id) {
        Cliente cliente = clienteRepo.findById(id).orElse(null);
        if (cliente == null) {
            ResponseCliente response = new ResponseCliente();
            response.error();
            response.addMessage("El cliente no existe");
            return response;
        }
        return mapCliente(cliente);
    }
    
    public List<ResponseCliente> search(String nombre) {
        return clienteRepo.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::mapCliente)
                .collect(Collectors.toList());
    }

    public ResponseCliente update(String id, RequestCliente request) {
        Cliente cliente = clienteRepo.findById(id).orElse(null);
        if (cliente == null) {
            ResponseCliente response = new ResponseCliente();
            response.error();
            response.addMessage("El cliente no existe");
            return response;
        }

        cliente.setNombre(request.getNombre());
        cliente.setTelefono(request.getTelefono());
        cliente.setCorreo(request.getCorreo());
        cliente.setDireccion(request.getDireccion());

        clienteRepo.save(cliente);

        ResponseCliente response = mapCliente(cliente);
        response.addMessage("Cliente actualizado correctamente.");
        return response;
    }

    public void delete(String id) {
        Cliente cliente = clienteRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        clienteRepo.delete(cliente);
    }
}
