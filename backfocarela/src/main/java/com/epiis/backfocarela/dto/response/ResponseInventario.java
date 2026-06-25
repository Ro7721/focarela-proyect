package com.epiis.backfocarela.dto.response;

import com.epiis.backfocarela.message.GenericResponse;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ResponseInventario extends GenericResponse {
    private String idInventario;
    private String nombreInsumo;
    private BigDecimal cantidad;
    private String unidadMedida;
    private BigDecimal stockMinimo;
}
