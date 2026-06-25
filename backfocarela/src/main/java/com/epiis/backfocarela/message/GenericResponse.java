package com.epiis.backfocarela.message;

import java.util.ArrayList;
import java.util.List;

public class GenericResponse {
    private String type;
    private List<String> listMessage; 

    public GenericResponse() {
        this.type = "error"; 
        this.listMessage = new ArrayList<>();
    }

    public String getType() {
        return this.type;
    }

    public List<String> getListMessage() {
        return this.listMessage;
    }

    public GenericResponse addMessage(String message) {
        this.listMessage.add(message);
        return this; 
    }

    public GenericResponse success() {
        this.type = "success";
        return this;
    }

    public GenericResponse warning() {
        this.type = "warning";
        return this;
    }

    public GenericResponse error() {
        this.type = "error";
        return this;
    }

    public GenericResponse exception() {
        this.type = "exception";
        return this;
    }
}
