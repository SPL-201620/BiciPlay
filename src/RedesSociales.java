import models.User;

public interface RedesSociales {
	public boolean publicarRuta(int idRuta);
	public boolean invitarAmigos(int idUsuario);
	public User loggin(String usuario, String contrasena);
}
