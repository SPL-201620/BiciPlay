package controllers.retos;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;
import controllers.recorridos.RecorridoIndividual;
import controllers.usuarios.Usuario;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.Fetch;


@Entity
@Table(name="reto")
public class Reto extends Model {

    @Id
    @Expose
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    public int id;

    @Expose
    @ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="creador_id")
    public Usuario creador;

    @Expose
    @ManyToOne()
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name="retado_id")
    public Usuario retado;

    @Expose
    @ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="recorrido_id")
    public RecorridoIndividual recorrido;


    public static Finder<Integer, Reto> find = new Finder<Integer, Reto>(Reto.class);

}
