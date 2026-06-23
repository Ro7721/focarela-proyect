package com.epiis.backfocarela.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "Usuario")
public class Usuario {
    @Id
    private String idUsuario;
    private String nombre; 
    private String apellido;
    @Column(unique = true) 
    private String correo; 
    private String password; 
    private String rol;
    private Boolean estado;
    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion; 
}
