import models.Ruta;

public interface RecorridosIndiviuales {

	public boolean registrarRuta (Ruta ruta);
	public boolean iniciaRecorrido (Ruta ruta);
	public boolean registrarPosicion (Ruta ruta);
	public boolean terminaRecorrido (Ruta ruta);

}
