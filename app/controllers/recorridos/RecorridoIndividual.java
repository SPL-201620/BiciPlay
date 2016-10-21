package controllers.recorridos;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;
import controllers.ruta.Ubicacion;
import controllers.usuarios.Usuario;
import scala.Int;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

    @Entity
    @Table(name="RecorridoIndividual")
    public class RecorridoIndividual extends Model {

        @Id
        @Expose
        @GeneratedValue(strategy= GenerationType.SEQUENCE)
        public int id;

        @Expose
        public int usuarioCreador;
        @Expose
        public String name;
        @Expose
        public Date fecha;
        @Expose
        public int duracion;
        @Expose
        public double distancia;
        @Expose
        public double calorias;

        @Expose
        public String clima;
        @Expose
        public String iconoClima;

        @Expose
        @OneToMany(mappedBy="recorridoIndividual",cascade=CascadeType.ALL)
        public List<Ubicacion> ubicaciones;



        public static Finder<Long, RecorridoIndividual> find =
                new Finder<Long, RecorridoIndividual>(RecorridoIndividual.class);

    }

