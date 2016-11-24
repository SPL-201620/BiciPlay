
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
            String name = json.findPath("name").textValue();
            String fechaRecorrido = json.findPath("fechaRecorrido").textValue();
            //Date fechaRecorrido = json.findPath("fechaRecorrido");
            int frecuencia = json.findPath("frecuencia").asInt();
            String unidadFrecuencia = json.findPath("unidadFrecuencia").textValue();
            String inicio = json.findPath("inicio").textValue();
            String destino = json.findPath("destino").textValue();
            System.out.println( name + " - " + frecuencia+
                    " - " + unidadFrecuencia + " - " + inicio + " - " + destino);

            if( name == null || frecuencia == 0 || unidadFrecuencia == null
                    || inicio == null || destino == null) {
                return badRequest("Missing parameteres");
            } else {
                RecorridoGrupal recorridoNuevo = new RecorridoGrupal();
                recorridoNuevo.usuarioCreador = Integer.parseInt(session(ID_USUARIO));
                recorridoNuevo.name= name;
                recorridoNuevo.fechaRecorrido = fechaRecorrido;
                recorridoNuevo.frecuencia = frecuencia;
                recorridoNuevo.unidadFrecuencia = unidadFrecuencia;
                recorridoNuevo.inicio =inicio;
                recorridoNuevo.destino = destino;
                recorridoNuevo.save();
                return ok(GSON.toJson(recorridoNuevo));
            }
        }
    }

    public Result darRecorridoGrupal(int id){
        return ok(GSON.toJson(RecorridoGrupal.find.byId((long)id)));
    }

    public Result darRecorridos() {
        String usuarioId =  session(ID_USUARIO);
        List<RecorridoGrupal> misRecorridos = RecorridoGrupal.find.where().eq("usuarioCreador", Integer.valueOf(usuarioId)).findList();
        return ok(GSON.toJson(misRecorridos));
        //return ok(GSON.toJson(amigo.misAmigos));
    }

    public Result darProximosRecorridos(){
        List<RecorridoGrupal> recorridosProximos = RecorridoGrupal.find.orderBy("fechaRecorrido asc").findList();
        return ok(GSON.toJson(recorridosProximos));
    }



    public Result unirseRecorridoGrupal() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            int idRecorrido = json.findPath("id").asInt();
            RecorridoGrupal recorrido = RecorridoGrupal.find.where().eq("id", idRecorrido).findUnique();
            recorrido.usuario.add(Usuario.find.where().eq("id", getUsuarioLogIn()).findUnique());
            recorrido.save();
            return ok("OK");
        }
    }



    public int getUsuarioLogIn(){
       //  return 21;
        return Integer.valueOf(session(ID_USUARIO));

    }
}
