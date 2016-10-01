package controllers.redessociales;



import controllers.usuarios.Usuario;

import java.util.List;

/**
 * Created by jose on 8/30/16.
 */
public interface IRedesSociales {
    public boolean publicarRecorridoIndividual(int recorridoIndividualId);
    public boolean invitarAmigos(List<Usuario> listaUsuarios);
    public Usuario loggin(String usuario, String contrasena);
}
