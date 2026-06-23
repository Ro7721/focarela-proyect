package com.epiis.backfocarela.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUsuario {
    private String nombre;
    private String apellido;
    private String correo; 
    private String password; 
    private String rol;
    private Boolean estado;
}
