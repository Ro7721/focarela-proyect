package com.epiis.backfocarela.dto.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class RequestProducto {
    private String idCategoria;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private String imagen;
    private Boolean estado;
}
