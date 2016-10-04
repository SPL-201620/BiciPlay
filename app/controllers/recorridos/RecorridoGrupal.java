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
@Table(name="recorrido_grupal")
public class RecorridoGrupal extends Model {

    @Id
    @Expose
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    public int id;

    @Expose
    public int usuario;
    @Expose
    public String name;
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

    @OneToMany(mappedBy="recorridoGrupal")
    public List<Ubicacion> ubicaciones;



    public static Finder<Long, RecorridoGrupal> find = new Finder<Long, RecorridoGrupal>(RecorridoGrupal.class);

}
