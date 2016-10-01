package controllers.ruta;

import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;

import javax.persistence.*;


@Entity
@Table(name="ubicacion")
public class Ubicacion extends Model {

    @Id
    @Expose
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    public int id;

    @Expose
    public double lat;
    @Expose
    public double lng;
    @Expose
    public String nombre;


    public static Finder<Long, controllers.usuarios.Usuario> find = new Finder<Long, controllers.usuarios.Usuario>(controllers.usuarios.Usuario.class);

}