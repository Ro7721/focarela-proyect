package com.epiis.backfocarela.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Inventario")
public class Inventario {
    @Id
    private String idInventario;
    @Column(name = "nombre_insumo")
    private String nombreInsumo; 
    private BigDecimal cantidad;
    @Column(name = "unidad_medida") 
    private BigDecimal unidadMedida;
    @Column(name = "stock_minimo")
    private BigDecimal stockMinimo; 
}
