package controllers.ruta;

import com.avaje.ebean.Expr;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.inject.Singleton;
import controllers.chat.Chat;
import controllers.recorridos.RecorridoGrupal;
import controllers.usuarios.Usuario;
import play.mvc.Controller;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;


import java.util.List;

import static play.mvc.Controller.request;
import static play.mvc.Controller.session;
import static play.mvc.Results.ok;

/**
 * Created by andres on 2/10/16.
 */
@Singleton
public class UbicacionController extends Controller {


    public final static String ID_USUARIO="idUsuario";
    public final static String ROL_USUARIO="rol";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

    @Inject
    public UbicacionController(Counter counter) {
    }

    public Result ingresarUbicaciones() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            RecorridoGrupal ubicaciones= GSON.fromJson(json.toString(), RecorridoGrupal.class);
            RecorridoGrupal recorrido=RecorridoGrupal.find.where().eq("id",ubicaciones.id ).findUnique();
            recorrido.ubicaciones=ubicaciones.ubicaciones;
            recorrido.save();
           return ok("OK");

        }
    }






}
