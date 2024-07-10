package com.example.demo.model;

import java.util.Date;

/**
 * Objeto que representa un fila de la tabla Películas
 */
public class Pelicula {
    private Integer id;
    private String titulo;
    private Date anio;
    private Double puntuacion;
    private String portada;
    private String genero;
    private String sinopsis;
    private String director;
    private String mostrar;


    public Pelicula() {
        // Constructor por defecto
    }

    public Pelicula(Integer id, String titulo, Date anio, Double puntuacion, String portada, String genero, String sinopsis, String director, String mostrar) {
        this.id = id;
        this.titulo = titulo;
        this.anio = anio;
        this.puntuacion = puntuacion;
        this.portada = portada;
        this.genero = genero;
        this.sinopsis = sinopsis;
        this.director = director;
        this.mostrar = mostrar;
    }

    public Pelicula(String titulo, Double puntuacion, String portada, String genero, String sinopsis, String director, String mostrar) {
        this.titulo = titulo;
        this.puntuacion = puntuacion;
        this.portada = portada;
        this.genero = genero;
        this.sinopsis = sinopsis;
        this.director = director;
        this.mostrar = mostrar;
    }

    public Pelicula(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Date getAnio() {
        return anio;
    }

    public void setAnio(Date anio) {
        this.anio = anio;
    }

    public Double getPuntuacion() {
        return puntuacion;
    }

    public void setPuntuacion(Double puntuacion) {
        this.puntuacion = puntuacion;
    }

    public String getPortada() {
        return portada;
    }

    public void setPortada(String portada) {
        this.portada = portada;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getSinopsis() {
        return sinopsis;
    }

    public void setSinopsis(String sinopsis) {
        this.sinopsis = sinopsis;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getMostrar() {
        return mostrar;
    }

    public void setMostrar(String mostrar) {
        this.mostrar = mostrar;
    }

    @Override
    public String toString() {
        return "Pelicula{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", anio=" + anio +
                ", puntuacion=" + puntuacion +
                ", portada='" + portada + '\'' +
                ", genero='" + genero + '\'' +
                ", sinopsis='" + sinopsis + '\'' +
                ", director='" + director + '\'' +
                ", mostrar='" + mostrar + '\'' +
                '}';
    }
}