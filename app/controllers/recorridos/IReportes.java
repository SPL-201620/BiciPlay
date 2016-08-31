package controllers.recorridos;

/**
 * Created by jose on 8/30/16.
 */
public interface IReportes {
    public Reporte generarReporte();
    public Reporte generarReporte(int mes, int anio);
    public Reporte generarReporte(int anio);
}
