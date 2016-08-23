import models.User;

public interface Chat {
	public boolean enviarMesaje(User from, User to, String mensaje);
}
