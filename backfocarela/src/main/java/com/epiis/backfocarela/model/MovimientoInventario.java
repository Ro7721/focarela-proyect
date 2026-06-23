package com.epiis.backfocarela.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "MovimientoInventario")
public class MovimientoInventario {
    @Id
    private String idMovimiento;
    @ManyToOne()
    @JoinColumn(name = "idInventario")
    private Inventario inventario;
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_movimiento")
    private TipoMovimiento tipoMovimiento;
    private Integer cantidad; 
    private LocalDate fecha; 
    private String observacion;
    
    public enum TipoMovimiento {
        ENTRADA,
        SALIDA
    }
}
