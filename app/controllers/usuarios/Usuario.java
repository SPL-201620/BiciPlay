package controllers.usuarios;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;

@Entity
@Table(name="usuario")
public class Usuario extends Model{

    @Id
    @Expose
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    public int id;

    @Expose
    public String name;
    @Expose
    public String email;

    public String password;
    @Expose
    public String foto;


    public static Finder<Long, Usuario> find = new Finder<Long,Usuario>(Usuario.class);

}


