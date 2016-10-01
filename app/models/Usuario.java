package models;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;

@Entity
@Table(name="usuario")
public class Usuario extends Model{

    @Id
    @Expose
    @SequenceGenerator(name="identifier", sequenceName="users_id_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="identifier")
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


