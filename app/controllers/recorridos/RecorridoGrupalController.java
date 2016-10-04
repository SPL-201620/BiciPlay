
package controllers.recorridos;
import com.avaje.ebean.ExpressionList;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import controllers.usuarios.Usuario;
import play.libs.Json;
import play.mvc.Controller;
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
public class RecorridoGrupalController {
    public final static String ID_USUARIO="idUsuario";
    public final static String ROL_USUARIO="rol";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

    @Inject
    public RecorridoGrupalController(Counter counter) {

    }

    public Result crearRecorrido() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            //int usuarioId = json.findPath(session(ID_USUARIO)).asInt();
            int usuarioId = json.findPath("usuario").asInt();
            String name = json.findPath("name").textValue();
            //Date fechaRecorrido = json.findPath("fechaRecorrido");
            int frecuencia = json.findPath("frecuencia").asInt();
            String unidadFrecuencia = json.findPath("unidadFrecuencia").textValue();
            String inicio = json.findPath("inicio").textValue();
            String destino = json.findPath("destino").textValue();
            System.out.println(usuarioId + " - " + name + " - " + frecuencia+
                    " - " + unidadFrecuencia + " - " + inicio + " - " + destino);

            if( usuarioId == 0 || name == null || frecuencia == 0 || unidadFrecuencia == null
                    || inicio == null || destino == null) {
                return badRequest("Missing parameteres");
            } else {
                RecorridoGrupal recorridoNuevo = new RecorridoGrupal();
                recorridoNuevo.usuario = usuarioId;
                recorridoNuevo.name= name;
                recorridoNuevo.fechaRecorrido = new Date();
                recorridoNuevo.frecuencia = frecuencia;
                recorridoNuevo.unidadFrecuencia = unidadFrecuencia;
                recorridoNuevo.inicio =inicio;
                recorridoNuevo.destino = destino;
                recorridoNuevo.save();
                return ok("OK");
            }
        }
    }

    public Result darRecorridos() {
        String usuarioId =  session(ID_USUARIO);
        List<RecorridoGrupal> misRecorridos = RecorridoGrupal.find.where().eq("usuario", Integer.valueOf(usuarioId)).findList();
        return ok(GSON.toJson(misRecorridos));
        //return ok(GSON.toJson(amigo.misAmigos));
    }

}
