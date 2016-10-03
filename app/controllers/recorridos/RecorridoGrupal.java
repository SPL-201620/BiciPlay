package controllers.recorridos;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;
import controllers.ruta.Ubicacion;
import scala.Int;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="recorrido_grupal")
public class RecorridoGrupal extends Model {

    @Id
    @Expose
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    public int id;

    @Expose
    public Date fechaRecorrido;
    @Expose
    public int frecuencia;
    @Expose
    public String unidadFrecuencia;
    @Expose
    public String inicio;
    @Expose
    public String destino;


    public List<Ubicacion> ubicacions;
/*
    @OneToMany
*/

    public static Finder<Long, controllers.usuarios.Usuario> find = new Finder<Long, controllers.usuarios.Usuario>(controllers.usuarios.Usuario.class);

}
