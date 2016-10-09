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
        public int usuario;
        @Expose
        public String name;
        @Expose
        public Date incioRecorrido;
        @Expose
        public Date finRecorrido;
        @Expose
        public double distancia;
        @Expose
        public double calorias;
        @Expose
        public double clima;

        @Expose
        public int frecuencia;
        @Expose
        public String unidadFrecuencia;
        @Expose
        public String inicio;
        @Expose
        public String destino;

        @OneToMany(mappedBy="recorridoIndividual")
        public List<Ubicacion> ubicaciones;



        public static Finder<Long, controllers.recorridos.RecorridoGrupal> find = new Finder<Long, controllers.recorridos.RecorridoGrupal>(controllers.recorridos.RecorridoGrupal.class);

    }

