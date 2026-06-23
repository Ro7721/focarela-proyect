package com.epiis.backfocarela.model;

import java.time.LocalDate;

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
@Table(name = "Pedido")
public class Pedido {
    @Id
    private String idPedido;
    @ManyToOne()
    @JoinColumn(name = "idUsuario") 
    private Usuario usuario;
    @ManyToOne()
    @JoinColumn(name = "idCliente")
    private Cliente cliente;
    private LocalDate fecha; 
    private Boolean estado; 
}
