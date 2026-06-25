package com.epiis.backfocarela.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.Cliente;

public interface ClienteRepo extends JpaRepository<Cliente, String> {


    List<Cliente> findAll();

    List<Cliente> findByNombre(String nombre);

    List<Cliente> findByNombreContainingIgnoreCase(String nombre);

    Optional<Cliente> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
}
