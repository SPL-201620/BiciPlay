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


    @Expose
    @ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="recorrido_realizado_id")
    public RecorridoIndividual recorridoRealizado;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Usuario getCreador() {
        return creador;
    }

    public void setCreador(Usuario creador) {
        this.creador = creador;
    }

    public Usuario getRetado() {
        return retado;
    }

    public void setRetado(Usuario retado) {
        this.retado = retado;
    }

    public RecorridoIndividual getRecorrido() {
        return recorrido;
    }

    public void setRecorrido(RecorridoIndividual recorrido) {
        this.recorrido = recorrido;
    }

    public RecorridoIndividual getRecorridoRealizado() {
        return recorridoRealizado;
    }

    public void setRecorridoRealizado(RecorridoIndividual recorridoRealizado) {
        this.recorridoRealizado = recorridoRealizado;
    }


    public static Finder<Integer, Reto> find = new Finder<Integer, Reto>(Reto.class);

}
