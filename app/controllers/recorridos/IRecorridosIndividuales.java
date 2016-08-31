package controllers.recorridos;

import controllers.ruta.Ruta;
import controllers.ruta.Ubicacion;

/**
 * Created by jose on 8/30/16.
 */
public interface IRecorridosIndividuales {
    public Ruta consultarRuta(Ubicacion inicio, Ubicacion destino);
    public RecorridoIndividual iniciarRecorrido (int rutaDeBaseId);
    public boolean registrarPosicion (int  rutaId, Ubicacion ubicacion);
    public boolean terminaRecorrido (int rutaId);
    public RecorridoIndividual darRecorrido(int recorridoIdivId);
}
