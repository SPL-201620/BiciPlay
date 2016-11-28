package controllers.configurador;


import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;

import java.util.ArrayList;
import java.util.List;



/**
 * Created by jose on 8/30/16.
 */
@Entity
@Table(name="Configurador")
public class Configurador extends Model  {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    public int id;

    @Expose
    public String manubrio;

    @Expose
    public String marco;

    @Expose
    public String tenedor;

    @Expose
    public String frenos;

    @Expose
    public String cambios;

    @Expose
    public String llantas;

    @Expose
    public String otros;

    public static Finder<Long, Configurador> find = new Finder<Long,Configurador>(Configurador.class);


}


