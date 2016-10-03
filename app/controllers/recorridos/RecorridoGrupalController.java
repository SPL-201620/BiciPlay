
package controllers.recorridos;
import com.avaje.ebean.ExpressionList;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
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
            //Date fechaRecorrido = json.findPath("fechaRecorrido");
               int frecuencia = json.findPath("frecuencia").asInt();
            String unidadFrecuencia = json.findPath("unidadFrecuencia").textValue();
            String inicio = json.findPath("inicio").textValue();
            String destino = json.findPath("destino").textValue();
            System.out.println(json.findPath("fechaRecorrido") + " - " + frecuencia+
                    " - " + unidadFrecuencia + " - " + inicio + " - " + destino);

            if( frecuencia == 0 || unidadFrecuencia == null || inicio == null || destino == null) {
                return badRequest("Missing parameteres");
            } else {
                RecorridoGrupal recorridoNuevo = new RecorridoGrupal();
                //recorridoNuevo.fechaRecorrido =fechaRecorrido;
                recorridoNuevo.frecuencia = frecuencia;
                recorridoNuevo.unidadFrecuencia = unidadFrecuencia;
                recorridoNuevo.inicio =inicio;
                recorridoNuevo.destino = destino;
                recorridoNuevo.save();
                return ok("OK");
            }
        }
    }




}
