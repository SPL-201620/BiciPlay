package controllers.chat;


/**
 * Created by jose on 8/30/16.
 */
public interface IChat {
    public boolean enviarMesaje(long fromUserId, long chatId, String mensaje);
    public boolean leerMensaje(long userId, long chatId);
    public Chat darChat(long chatId);
}
