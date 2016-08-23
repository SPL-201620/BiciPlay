import java.util.Date;
import java.util.List;

import models.*;

public interface RecorridosGrupales {

	public List<RecorridoGrupal> darRecorridos ();
	public boolean agregarRecorrido(User creador, Ruta ruta, Date fecha );
	public boolean invitarPersonas(List<User> lista);
	
}
