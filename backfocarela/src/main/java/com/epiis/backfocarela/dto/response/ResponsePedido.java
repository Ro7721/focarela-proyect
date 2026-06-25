package com.epiis.backfocarela.dto.response;

import com.epiis.backfocarela.message.GenericResponse;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ResponsePedido extends GenericResponse {
    private String idPedido;
    private String idCliente;
    private String idUsuario;
    private LocalDateTime fecha;
    private String estado;
}
