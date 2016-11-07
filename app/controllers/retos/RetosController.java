
package controllers.retos;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import controllers.recorridos.RecorridoGrupal;
import controllers.recorridos.RecorridoIndividual;
import controllers.usuarios.Usuario;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import java.util.List;

import static play.mvc.Controller.request;
import static play.mvc.Controller.session;
import static play.mvc.Results.badRequest;
import static play.mvc.Results.ok;

/**
 * Created by Daniel on 2/10/2016.
 */
@Singleton
public class RetosController {
    public final static String ID_USUARIO = "idUsuario";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

    @Inject
    public RetosController(Counter counter) {

    }

    public Result retarAmigo() {
        JsonNode json = request().body().asJson();
        if (json == null) return badRequest("Expecting Json data");

        Reto reto = new Reto();
        reto.creador = new Usuario(getUsuarioLogIn());
        reto.retado = new Usuario(json.findPath("retadoId").asInt());
        reto.recorrido = new RecorridoIndividual(json.findPath("recorridoId").asInt());
        reto.save();
        return ok(GSON.toJson(reto));
    }

    public Result darRetos() {
        List<Reto> misRetos = Reto.find.where().eq("retado_id", getUsuarioLogIn()).findList();
        for(Reto reto: misRetos){
            reto.retado = Usuario.find.byId((long)reto.retado.id);
            reto.creador = Usuario.find.byId((long)reto.creador.id);
            reto.recorrido = RecorridoIndividual.find.byId((long)reto.recorrido.id);
        }
        return ok(GSON.toJson(misRetos));
    }


    public int getUsuarioLogIn() {
        //  return 21;
        return Integer.valueOf(session(ID_USUARIO));

    }
}
