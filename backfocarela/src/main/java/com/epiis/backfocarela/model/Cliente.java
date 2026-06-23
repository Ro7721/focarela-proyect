package com.epiis.backfocarela.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Cliente")
public class Cliente {
    @Id
    private String idCliente;
    private String nombre; 
    private String telefono;
    private String correo; 
    private String direccion;
}
