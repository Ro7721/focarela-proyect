package com.epiis.backfocarela.model;

import jakarta.persistence.Column;
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
@Table(name = "DatallePedido")
public class DetallePedido {
    @Id
    @Column(name = "idDetalle")
    private String idDetalle;
    @ManyToOne()
    @JoinColumn(name = "idPedido") 
    private Pedido pedido;
    @ManyToOne()
    @JoinColumn(name = "idProducto") 
    private Producto producto; 
    private Integer cantidad; 
}
