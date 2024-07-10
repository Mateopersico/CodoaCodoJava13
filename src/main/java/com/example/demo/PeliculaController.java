package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.PeliculaDAO;
import com.example.demo.model.Pelicula;

@RestController
public class PeliculaController {

    @CrossOrigin(origins = "*")
    @GetMapping("/listarPeliculas")
    public List<Pelicula> listarPeliculas() {
        PeliculaDAO peliculaDAO = new PeliculaDAO();
        return peliculaDAO.listar();
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/addPelicula")
    public boolean addPelicula(@RequestBody Pelicula peli) {
        PeliculaDAO peliculaDAO = new PeliculaDAO();
        return peliculaDAO.add(peli);
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping("/delPelicula/{id}")
    public boolean delPelicula(@PathVariable("id") Integer id) {
        PeliculaDAO peliculaDAO = new PeliculaDAO();
        return peliculaDAO.del(id);
    }

    @CrossOrigin(origins = "*")
    @PutMapping("/toggleMostrar/{id}")
    public boolean toggleMostrar(@PathVariable("id") Integer id) {
        PeliculaDAO peliculaDAO = new PeliculaDAO();
        return peliculaDAO.toggleMostrar(id);
    }
}
