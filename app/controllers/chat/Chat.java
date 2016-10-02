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
    public int receptor;

    @Expose
    public int emisor;

    @Expose
    public Date fechaHora;

    @Expose
    public String mensaje;

    public static Finder<Long, Chat> find = new Finder<Long,Chat>(Chat.class);





}
