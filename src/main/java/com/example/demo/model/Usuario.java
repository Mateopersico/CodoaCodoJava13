package com.example.demo.model;

public class Usuario {
    private Integer id;
    private String usu;
    private String pass;
    public Usuario(Integer id, String usu, String pass) {
        this.id = id;
        this.usu = usu;
        this.pass = pass;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getUsu() {
        return usu;
    }
    public void setUsu(String usu) {
        this.usu = usu;
    }
    public String getPass() {
        return pass;
    }
    public void setPass(String pass) {
        this.pass = pass;
    }

    
    
    
}
