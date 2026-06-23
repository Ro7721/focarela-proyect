package com.epiis.backfocarela.business;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.epiis.backfocarela.dto.response.ResponseUsuarioGetAll;
import com.epiis.backfocarela.model.Usuario;
import com.epiis.backfocarela.repository.UsuarioRepo;

@Service
public class BusinessUsuario {
    private final UsuarioRepo usuarioRepo;

    public BusinessUsuario(UsuarioRepo usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    
    public ResponseUsuarioGetAll getAll() {
        ResponseUsuarioGetAll response = new ResponseUsuarioGetAll();
        
        List<Usuario> listEntityUsuario = usuarioRepo.findAll();
        
        for(Usuario item: listEntityUsuario) {
            Map<String, String> data = new HashMap<>();
            
            data.put("idUsuario", String.valueOf(item.getIdUsuario()));
            data.put("nombre", item.getNombre());
            data.put("apellido", item.getApellido());
            data.put("correo", item.getCorreo());
            data.put("rol", item.getRol());
            data.put("estado", item.getEstado() ? "Activo" : "Inactivo");
            
            response.getListUsuario().add(data);
        }
        
        response.success();
        
        return response;
    }
}