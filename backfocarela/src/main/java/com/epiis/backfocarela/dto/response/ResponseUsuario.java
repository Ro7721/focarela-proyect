package com.epiis.backfocarela.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseUsuario {
    private String idUsuario;
    private String nombre; 
    private String apellido;
    private String correo; 
    private String password; 
    private String rol;
    private Boolean estado;
}
