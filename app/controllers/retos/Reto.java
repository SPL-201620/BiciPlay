package controllers.retos;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;
import controllers.recorridos.RecorridoIndividual;
import controllers.ruta.Ubicacion;
import controllers.usuarios.Usuario;
import scala.Int;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="reto")
public class Reto extends Model {

    @Id
    @Expose
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    public int id;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="creador_id")
    public Usuario creador;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="retado_id")
    public Usuario retado;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name="recorrido_id")
    public RecorridoIndividual recorrido;


    public static Finder<Integer, Reto> find = new Finder<Integer, Reto>(Reto.class);

}
