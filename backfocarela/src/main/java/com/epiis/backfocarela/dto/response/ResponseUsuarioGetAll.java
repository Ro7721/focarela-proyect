package com.epiis.backfocarela.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ResponseUsuarioGetAll {
    private int codigo;
    private String mensaje;
    private List<Map<String, String>> listUsuario = new ArrayList<>();
    
    public void success() {
        this.codigo = 200;
        this.mensaje = "Operación exitosa";
    }
    
    public void error(String mensaje) {
        this.codigo = 500;
        this.mensaje = mensaje;
    }
    
    public int getCodigo() { return codigo; }
    public void setCodigo(int codigo) { this.codigo = codigo; }
    
    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }
    
    public List<Map<String, String>> getListUsuario() { return listUsuario; }
    public void setListUsuario(List<Map<String, String>> listUsuario) { this.listUsuario = listUsuario; }
}