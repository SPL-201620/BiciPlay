package controllers.reportes;

import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;
import controllers.recorridos.RecorridoIndividual;
import controllers.usuarios.Usuario;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;


@Entity
@Table(name="reporte")
public class Reporte extends Model {


    @Id
    @Expose
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    public int id;

    @Expose
    public String tipo;
    @Expose
    public double cantidad;
    @Expose
    public int periodo;
    @Expose
    @ManyToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name="usuario_id")
    public Usuario creador;

    public Reporte(String tipo, double cantidad, int periodo, Usuario creador) {
        this.tipo = tipo;
        this.cantidad = cantidad;
        this.periodo = periodo;
        this.creador = creador;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public double getCantidad() {
        return cantidad;
    }

    public void setCantidad(double cantidad) {
        this.cantidad = cantidad;
    }

    public int getPeriodo() {
        return periodo;
    }

    public void setPeriodo(int periodo) {
        this.periodo = periodo;
    }

    public Usuario getCreador() {
        return creador;
    }

    public void setCreador(Usuario creador) {
        this.creador = creador;
    }

    public static Finder<Integer, Reporte> find = new Finder<Integer, Reporte>(Reporte.class);

}
