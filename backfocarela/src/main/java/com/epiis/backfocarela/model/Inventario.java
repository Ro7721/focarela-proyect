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

    @Column(name = "nombre_insumo", nullable = false, length = 100)
    private String nombreInsumo; 

    @Column(nullable = false)
    private BigDecimal cantidad;  

    @Column(name = "unidad_medida", nullable = false, length = 20)
    private String unidadMedida;  

    @Column(name = "stock_minimo", nullable = false)
    private BigDecimal stockMinimo;
}
