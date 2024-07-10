package com.example.demo.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.db.ConnectorDB;
import com.example.demo.model.Pelicula;

public class PeliculaDAO {

    public List<Pelicula> listar() {
        List<Pelicula> listPeli = new ArrayList<>();
        try {
            Statement st = ConnectorDB.getSt();
            ResultSet rs = st.executeQuery("SELECT * FROM peliculas");

            while (rs.next()) {
                Pelicula peli = new Pelicula(
                    rs.getInt("id"),
                    rs.getString("titulo"),
                    rs.getDate("anio"),
                    rs.getDouble("puntuacion"),
                    rs.getString("portada"),
                    rs.getString("genero"),
                    rs.getString("sinopsis"),
                    rs.getString("director"),
                    rs.getString("mostrar")
                );
                listPeli.add(peli);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listPeli;
    }

    public boolean add(Pelicula peli) {
        try {
            Connection conn = ConnectorDB.getConn();
            String sql = "INSERT INTO peliculas (titulo, anio, puntuacion, portada, genero, sinopsis, director, mostrar) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, peli.getTitulo());
            pstmt.setDate(2, new Date(peli.getAnio().getTime()));
            pstmt.setDouble(3, peli.getPuntuacion());
            pstmt.setString(4, peli.getPortada());
            pstmt.setString(5, peli.getGenero());
            pstmt.setString(6, peli.getSinopsis());
            pstmt.setString(7, peli.getDirector());
            pstmt.setString(8, peli.getMostrar());

            int cantInsert = pstmt.executeUpdate();
            return cantInsert == 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean del(int id) {
        try {
            Connection conn = ConnectorDB.getConn();
            String sql = "DELETE FROM peliculas WHERE id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);
            int cantDel = pstmt.executeUpdate();
            return cantDel == 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean toggleMostrar(int id) {
        try {
            Connection conn = ConnectorDB.getConn();
            String sql = "UPDATE peliculas SET mostrar = CASE WHEN mostrar = 'SI' THEN 'NO' ELSE 'SI' END WHERE id = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, id);

            int rowsUpdated = pstmt.executeUpdate();
            return rowsUpdated == 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
