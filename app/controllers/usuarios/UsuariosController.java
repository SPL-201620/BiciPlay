package controllers.usuarios;

import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.Controller;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.inject.Singleton;

/**
 * This controller demonstrates how to use dependency injection to
 * bind a component into a controller class. The class contains an
 * action that shows an incrementing count to users. The {@link Counter}
 * object is injected by the Guice dependency injection system.
 */
@Singleton
public class UsuariosController extends Controller {
    public final static String ID_USUARIO="idUsuario";
    public final static String ROL_USUARIO="rol";

    @Inject
    public UsuariosController(Counter counter) {

    }

    /**
     * An action that responds with the {@link Counter}'s current
     * count. The result is plain text. This action is mapped to
     * <code>GET</code> requests with a path of <code>/count</code>
     * requests by an entry in the <code>routes</code> config file.
     */
    public Result registroGet() {
        return ok("ok prueba Get");
    }

    public Result registroPost() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String name = json.findPath("name").textValue();
            if(name == null) {
                return badRequest("Missing parameter [name]");
            } else {
                return ok("Hello " + name);
            }
        }
    }
    public Result registro() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String name = json.findPath("name").textValue();
            String correo = json.findPath("correo").textValue();
            String contrasena = json.findPath("contrasena").textValue();
            if(name == null || correo == null || contrasena == null) {
                return badRequest("Missing parameter");
            } else {
                return ok("OK");
            }
        }
    }
    public Result login() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String correo = json.findPath("username").textValue();
            String contrasena = json.findPath("password").textValue();
            if(correo == null || contrasena == null) {
                return badRequest("Missing parameter");
            } else {
                session().clear();
                //TODO el id y demas datos deben ser de la BD
                session(ID_USUARIO, "100");
                session(ROL_USUARIO, "admin");
                return ok("ok prueba loggedin" ); //TODO se debe rtornar todos los datos de la base de datos
                //TODO identificar el rol del usuario
            }
        }
    }
    public Result loggedin() {
        if (session(ID_USUARIO)==null) {
            return ok("0");
        }else {
            //TODO ir a BD igual que el loguin
            return ok("ok prueba loggedin");
        }
    }
}
