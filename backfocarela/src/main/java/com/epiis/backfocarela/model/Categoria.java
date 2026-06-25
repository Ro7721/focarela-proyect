package com.epiis.backfocarela.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CategoriaProducto")
public class Categoria {
    @Id
    private String idCategoria; 
    private String nombre;  
    private String descripcion;
}
