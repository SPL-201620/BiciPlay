package controllers.usuarios;

import models.Usuario;

/**
 * Created by jose on 8/30/16.
 */
public interface IUsuarios {
    public Usuario darUsuario(int id);
    public Usuario modificarUsuario(Usuario user);
    public boolean login  (String login, String password);
    public boolean logout();

}
