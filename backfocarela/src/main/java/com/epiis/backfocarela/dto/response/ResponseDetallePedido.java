package com.epiis.backfocarela.dto.response;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseDetallePedido {

    private String idDetalle;
    private String idProducto;
    private String productoNombre;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotal;
}
