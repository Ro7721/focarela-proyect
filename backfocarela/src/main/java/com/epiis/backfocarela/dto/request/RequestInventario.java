package com.epiis.backfocarela.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class RequestInventario {
    private String nombreInsumo;
    private BigDecimal cantidad;
    private String unidadMedida;   // ahora String
    private BigDecimal stockMinimo;
}


