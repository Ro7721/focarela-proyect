package com.epiis.backfocarela.business;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.epiis.backfocarela.dto.request.RequestUsuario;
import com.epiis.backfocarela.dto.response.ResponseUsuario;
import com.epiis.backfocarela.message.GenericResponse;
import com.epiis.backfocarela.model.Usuario;
import com.epiis.backfocarela.repository.UsuarioRepo;
import com.epiis.backfocarela.security.PasswordEncryptor;

@Service
public class BusinessUsuario {
    private final UsuarioRepo usuarioRepo;
    private final PasswordEncryptor passwordEncryptor;

    public BusinessUsuario(
            UsuarioRepo usuarioRepo,
            PasswordEncryptor passwordEncryptor) {

        this.usuarioRepo = usuarioRepo;
        this.passwordEncryptor = passwordEncryptor;
    }

    public ResponseUsuario mapUsuario(Usuario usuario) {

        ResponseUsuario response = new ResponseUsuario();

        response.setIdUsuario(usuario.getIdUsuario());
        response.setNombre(usuario.getNombre());
        response.setApellido(usuario.getApellido());
        response.setCorreo(usuario.getCorreo());
        response.setRol(usuario.getRol());
        response.setEstado(usuario.getEstado());

        return response;
    }

    // INSERTAR
    public ResponseUsuario insert(RequestUsuario request) {
        GenericResponse response = new GenericResponse();
        if (usuarioRepo.existsByCorreo(request.getCorreo())) {
            response.warning();
            response.addMessage("El correo ya existe");
            return null;
        }

        Usuario usuario = new Usuario();

        usuario.setIdUsuario(UUID.randomUUID().toString());
        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(passwordEncryptor.encrypt(request.getPassword()));

        usuario.setRol(request.getRol());
        usuario.setEstado(request.getEstado());
        usuario.setFechaCreacion(LocalDate.now());

        usuarioRepo.save(usuario);

        return mapUsuario(usuario);
    }

    // LISTAR
    public List<ResponseUsuario> getAll() {

        return usuarioRepo.findAll()
                .stream()
                .map(this::mapUsuario)
                .collect(Collectors.toList());
    }

    // BUSCAR POR ID
    public ResponseUsuario getById(String id) {
        GenericResponse response = new GenericResponse();
        Usuario usuario = usuarioRepo.findById(id).get();
        if (usuario == null) {
            response.error();
            response.addMessage("El usuario no existe");
            return null;
        }

        return mapUsuario(usuario);
    }

    // BUSCAR POR NOMBRE
    public List<ResponseUsuario> search(String nombre) {

        return usuarioRepo.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::mapUsuario)
                .collect(Collectors.toList());
    }

    // ACTUALIZAR
    public ResponseUsuario update(String id, RequestUsuario request) {

        GenericResponse response = new GenericResponse();
        Usuario usuario = usuarioRepo.findById(id).orElse(null);
        if (usuario == null) {
            response.error();
            response.addMessage("El usuario no existe");
            return null;
        }

        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {

            usuario.setPassword(passwordEncryptor.encrypt(request.getPassword()));
        }

        usuario.setRol(request.getRol());
        usuario.setEstado(request.getEstado());

        usuarioRepo.save(usuario);
        response.success();
        response.addMessage("Usuario actualizado correctamente.");
        return mapUsuario(usuario);
    }

    // ELIMINAR
    public void delete(String id) {

        Usuario usuario = usuarioRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuarioRepo.delete(usuario);
    }

}