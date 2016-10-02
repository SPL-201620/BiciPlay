package controllers.usuarios;

import javax.persistence.*;
import com.avaje.ebean.Model;
import com.google.gson.annotations.Expose;

import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany
    @JoinTable(name="amigos",
            joinColumns=@JoinColumn(name="usuarioId"),
            inverseJoinColumns=@JoinColumn(name="amigoId")
    )
    public List<Usuario> misAmigos;
/*
    @ManyToMany
    @JoinTable(name="amigos",
            joinColumns=@JoinColumn(name="amigoId"),
            inverseJoinColumns=@JoinColumn(name="usuarioId")
    )
    public List<Usuario> amigosDe;
*/

    public static Finder<Long, Usuario> find = new Finder<Long,Usuario>(Usuario.class);

}


