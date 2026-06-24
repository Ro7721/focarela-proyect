package com.epiis.backfocarela.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, String>{

    List<Usuario> findAll();

    List<Usuario> findByNombre(String nombre);
}
