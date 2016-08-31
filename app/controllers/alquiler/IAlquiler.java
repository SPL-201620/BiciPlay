package controllers.alquiler;

import controllers.ruta.Ruta;
import controllers.ruta.Ubicacion;

import java.util.List;

/**
 * Created by jose on 8/30/16.
 */
public interface IAlquiler {
    public SitioAlquiler crearSitio(String nombre, String descripcion, Ubicacion ubicacion);
    public void definirLimites(long sitioAlquilerId, Ruta limites);
    public Ruta darLimites(long sitioAlquilerId, Ruta limites);
    public Tarifa crearTartifa(long sitioAlquilerId, String nombre, String descripcion, int precio);
    public PuntoEntrega crearPuntoEntrega(long sitioAlquilerId, Ubicacion ubicacion);
    public PuntoEntrega quitarPuntoEntrega(long puntoEntregaId);
    public Tarifa modificarTarifa (long tarifaId, int precioNuevo);
    public List<Tarifa> darTarifas (long sitioAlquilerId);


}
