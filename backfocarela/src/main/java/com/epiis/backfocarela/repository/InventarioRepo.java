package com.epiis.backfocarela.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.epiis.backfocarela.model.Inventario;

public interface InventarioRepo extends JpaRepository<Inventario, String> {

    List<Inventario> findAll();

    List<Inventario> findByNombreInsumo(String nombreInsumo);

    List<Inventario> findByNombreInsumoContainingIgnoreCase(String nombreInsumo);

    boolean existsByNombreInsumo(String nombreInsumo);
}
