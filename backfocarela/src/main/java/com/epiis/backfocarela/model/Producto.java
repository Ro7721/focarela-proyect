package com.epiis.backfocarela.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Producto")
public class Producto {
    @Id
    private String idProducto;
    @ManyToOne()
    @JoinColumn(name = "idCategoria") 
    private Categoria categoria;
    private String nombre; 
    private String descripcion;
    private BigDecimal precio; 
    private String imagen;
    private Boolean estado; 
}
