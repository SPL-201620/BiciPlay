package controllers.chat;

import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by jose on 8/30/16.
 */

@Entity
@Table(name="chat")
public class Chat extends Model {


    @Id
    @Expose
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    public int id;

    @Expose
    public String idUsuario1;

    @Expose
    public String idUsuario2;

    @Expose
    public Date fechaHora;

    @Expose
    public String mensaje;







}
