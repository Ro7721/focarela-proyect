package com.epiis.backfocarela.dto.response;

import com.epiis.backfocarela.message.GenericResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseCliente extends GenericResponse {
    private String idCliente;
    private String nombre;
    private String telefono;
    private String correo;
    private String direccion;
}
