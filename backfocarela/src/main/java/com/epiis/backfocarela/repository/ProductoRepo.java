package com.epiis.backfocarela.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.backfocarela.model.Producto;

public interface ProductoRepo extends JpaRepository<Producto, String> {
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    List<Producto> findByCategoria_IdCategoria(String idCategoria);

    List<Producto> findByEstadoTrue();

    List<Producto> findByCategoria_IdCategoriaAndEstadoTrue(String idCategoria);

    List<Producto> findByNombreContainingIgnoreCaseAndEstadoTrue(String nombre);
}
