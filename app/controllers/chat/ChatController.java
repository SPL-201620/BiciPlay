package controllers.chat;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.inject.Singleton;
import controllers.usuarios.Usuario;
import play.mvc.Controller;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import java.util.Date;

/**
 * Created by andres on 2/10/16.
 */
@Singleton
public class ChatController extends Controller {
    public final static String ID_USUARIO="idUsuario";
    public final static String ROL_USUARIO="rol";
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

    @Inject
    public ChatController(Counter counter) {
    }


    public Result enviarMensaje() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String usuario1 = json.findPath("idUsuario1").textValue();
            String usuario2 = json.findPath("idUsuario2").textValue();
            String mensaje =  json.findPath("mensaje").textValue();
            Date fecha=new Date();



            if(usuario1 == null || usuario2  == null) {
                return badRequest("Missing parameter");
            } else {
                Chat chatNuevo = new Chat();
                chatNuevo.idUsuario1 =usuario1;
                chatNuevo.idUsuario1 = usuario2;
                chatNuevo.mensaje=mensaje;
                chatNuevo.fechaHora=fecha;
                chatNuevo.save();
                return ok("Ok");
            }
        }
    }




}
