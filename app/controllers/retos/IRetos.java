package controllers.retos;

import controllers.usuarios.Usuario;

import java.util.List;

/**
 * Created by jose on 8/30/16.
 */
public interface IRetos {
    public Reto retarAmigos(List<Usuario> amigos, long rutaId);
    public void notificarReto(List<Usuario> amigos, Reto reto);
    public void notificarActualizacionRanking(List<Usuario> amigos, Reto reto, long recorridoIndivId);
    public Reto darReto (long retoId);
    public void aceptarReto (long retoId);
    public void intentarReto (long retoId, long recorridoIndivId);
}
