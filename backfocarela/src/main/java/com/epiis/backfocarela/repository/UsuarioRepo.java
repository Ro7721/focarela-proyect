package com.epiis.backfocarela.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, String>{

    
}
