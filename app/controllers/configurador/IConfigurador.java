package controllers.configurador;

import java.util.List;

/**
 * Created by jose on 8/30/16.
 */
public interface IConfigurador {

    public Configuracion crearConfiguracion();
    public boolean crearPieza (Pieza pieza);
    public boolean agregarPieza(int idPieza);
    public List<Pieza> darPiezas();

}
