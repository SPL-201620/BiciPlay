
package controllers.recorridos;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManagerFactory;
import java.util.Date;
import java.util.List;

import static play.mvc.Controller.request;
import static play.mvc.Controller.session;
import static play.mvc.Results.badRequest;
import static play.mvc.Results.ok;

/**
 * Created by Daniel on 2/10/2016.
 */
@Singleton
public class RecorridoIndividualController {
    public final static String ID_USUARIO = "idUsuario";
    public final static String ROL_USUARIO = "rol";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

    @Inject
    public RecorridoIndividualController(Counter counter) {

    }


    public Result iniciarRecorrido() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
            RecorridoIndividual recorridoIndividual = new RecorridoIndividual();
            recorridoIndividual.fecha = new Date();
            recorridoIndividual.usuarioCreador = getUsuarioLogIn();
            return ok("OK");
        }
    }

    public Result finalizarRecorrido() {

        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {

            int idRecorridoIndividual = json.findPath("id").asInt();
            RecorridoIndividual recorridoInd = RecorridoIndividual.find.where().eq("id", idRecorridoIndividual).findUnique();
            recorridoInd.fecha = new Date();
            recorridoInd.distancia = getDistancia();
            recorridoInd.calorias = calcularCalorias(recorridoInd.distancia);

            return ok("OK");

        }
    }

    public Result registrarRecorrido() {

        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {

            RecorridoIndividual recorridoIndividual = GSON.fromJson(json.toString(), RecorridoIndividual.class);
            recorridoIndividual.fecha = new Date();
            recorridoIndividual.usuarioCreador = getUsuarioLogIn();
            recorridoIndividual.calorias = calcularCalorias(recorridoIndividual.distancia);
            recorridoIndividual.save();

            return ok("OK");

        }
    }


    public Result darRecorridosIndividuales() {

        List<RecorridoIndividual> misRecorridos = RecorridoIndividual.find.where().eq("usuarioCreador", getUsuarioLogIn()).findList();
        return ok(GSON.toJson(misRecorridos));

    }


    public double calcularCalorias(double distancia) {

        return distancia * 60;

    }


    public double getDistancia() {

        return 3.0;

    }

    public int getUsuarioLogIn() {
        //  return 21;
        return Integer.valueOf(session(ID_USUARIO));

    }
}
