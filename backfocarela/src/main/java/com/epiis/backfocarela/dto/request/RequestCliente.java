package com.epiis.backfocarela.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestCliente {
    private String nombre;
    private String telefono;
    private String correo;
    private String direccion;
}
