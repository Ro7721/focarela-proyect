package com.epiis.backfocarela.dto.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestPedido {

    private String idCliente;
    private String idUsuario;
    private String estado;
    private List<RequestDetallePedido> detalles;
}
