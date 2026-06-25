package com.epiis.backfocarela.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.Categoria;

public interface categoriapRepo extends JpaRepository<Categoria, String> {
    boolean existsByNombre(String nombre);
}
