package com.epiis.backfocarela.dto.response;

import com.epiis.backfocarela.message.GenericResponse;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseCategoria extends GenericResponse {
    private String idCategoria;
    private String nombre;
    private String descripcion;
}
