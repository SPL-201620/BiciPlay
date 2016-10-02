package controllers.chat;

import com.avaje.ebean.Expr;
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
import java.beans.Expression;
import java.util.Date;
import java.util.List;


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
            int  receptor = json.findPath("receptor").asInt();
            int  emisor =  getUsuarioLogIn();
            String mensaje =  json.findPath("mensaje").textValue();
            Date fecha=new Date();

                Chat chatNuevo = new Chat();
                chatNuevo.receptor =receptor;
                chatNuevo.emisor = emisor;
                chatNuevo.mensaje=mensaje;
                chatNuevo.fechaHora=fecha;
                chatNuevo.save();
                return ok("Oks");

        }
    }


    public Result leerMensaje() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            int  emisor =  getUsuarioLogIn();
            int receptor = json.findPath("receptor").asInt();
                         List<Chat> mensajes = Chat.find.where().or(Expr.and(Expr.eq("receptor",receptor),Expr.eq("emisor",emisor))
                        ,Expr.and(Expr.eq("emisor",receptor),Expr.eq("receptor",emisor))).findList();

                return ok(GSON.toJson(mensajes));

        }
    }


    public int getUsuarioLogIn(){
        return 1;
       // return Integer.valueOf(session(ID_USUARIO));


    }


}
