package models;

import javax.persistence.*;

@Entity
@Table(name="users")
public class Usuario {

    @Id
    @SequenceGenerator(name="identifier", sequenceName="users_id_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="identifier")
    private int id;

    String name = null;
    String login = null;
    String password = null;

    public int get_Id(){
        return id;
    }
    public void set_Id(int id){
        this.id = id;
    }
    public String getName(){
        return name;
    }
    public void setName(String Name){
        this.name = Name;
    }
    public String getLogin(){
        return login;
    }
    public void setLogin(String Login){
        this.login = Login;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(String Password){
        this.password = Password;
    }

}