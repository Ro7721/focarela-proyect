package com.epiis.backfocarela.dto.response;

import com.epiis.backfocarela.message.GenericResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseUsuario extends GenericResponse {
    private String idUsuario;
    private String nombre;
    private String apellido;
    private String correo;
    private String rol;
    private Boolean estado;
}
