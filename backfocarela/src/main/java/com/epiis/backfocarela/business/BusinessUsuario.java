package com.epiis.backfocarela.business;


import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.epiis.backfocarela.dto.request.RequestUsuario;
import com.epiis.backfocarela.dto.response.ResponseUsuario;
import com.epiis.backfocarela.message.GenericResponse;
import com.epiis.backfocarela.model.Usuario;
import com.epiis.backfocarela.repository.UsuarioRepo;

@Service
public class BusinessUsuario {
    private final UsuarioRepo usuarioRepo;

    public BusinessUsuario(UsuarioRepo usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    

    public Usuario insert(RequestUsuario request){
        GenericResponse response = new GenericResponse();
        Usuario usuario = new Usuario();
        usuario.setIdUsuario(UUID.randomUUID().toString());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(request.getPassword());
        usuario.setRol(request.getRol());
        usuario.setEstado(request.getEstado());
        response.success();
        response.addMessage("Usuario creado exitosamente");
        return usuarioRepo.save(usuario);
    }

    public ResponseUsuario mapUsuario(Usuario usuario){
        ResponseUsuario response = new ResponseUsuario();
        response.setIdUsuario(usuario.getIdUsuario());
        response.setNombre(usuario.getNombre());
        response.setApellido(usuario.getApellido());
        response.setCorreo(usuario.getCorreo());
        response.setEstado(usuario.getEstado());
        response.setRol(usuario.getRol());
        return response;
    }

    public List<ResponseUsuario> getAll(){
        return usuarioRepo.findAll()
                .stream().map(this::mapUsuario).collect(Collectors.toList());
    }

    public List<ResponseUsuario> search(String nombre){
        List<ResponseUsuario> list = usuarioRepo.findByNombre(nombre).stream().map(this::mapUsuario).collect(Collectors.toList());
        return list;
    }
    
}