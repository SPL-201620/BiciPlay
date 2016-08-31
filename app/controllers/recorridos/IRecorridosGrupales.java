package controllers.recorridos;

import controllers.ruta.Ruta;
import controllers.usuarios.Usuario;

import java.util.Date;
import java.util.List;

/**
 * Created by jose on 8/30/16.
 */
public interface IRecorridosGrupales {
    public List<RecorridoGrupal> darRecorridos (Usuario invitadoOCreador);
    public boolean crearRecorrido(int usuarioId, Ruta ruta, Date fecha );
    public boolean invitarUsuarios(List<Usuario> lista);
}
