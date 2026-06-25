package com.epiis.backfocarela.dto.response;

import java.math.BigDecimal;

import com.epiis.backfocarela.message.GenericResponse;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ResponseProducto extends GenericResponse {
    private String idProducto;
    private String idCategoria;
    private String categoriaNombre;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String imagen;
    private Boolean estado;
}
