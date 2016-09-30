package models;

import javax.persistence.*;
import com.avaje.ebean.Model;

@Entity
@Table(name="usuario")
public class Usuario extends Model{

    @Id
    @SequenceGenerator(name="identifier", sequenceName="users_id_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="identifier")
    private int id;

    public String name = null;
    public String login = null;
    public String password = null;
    public static Finder<Long, Usuario> find = new Finder<Long,Usuario>(Usuario.class);

}


