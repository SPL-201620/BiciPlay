package controllers.usuarios;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.libs.Json;
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
            String email = json.findPath("email").textValue();
            String password = json.findPath("password").textValue();
            if(name == null || email == null || password == null) {
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
                ObjectNode datos = Json.newObject();
                session(ID_USUARIO, "100");
                session(ROL_USUARIO, "admin");
                datos.put("id","100");
                datos.put("nomre","Daniel");
                return ok(datos); //TODO se debe rtornar todos los datos de la base de datos
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
    public Result logout() {
        JsonNode json = request().body().asJson();
            session().clear();
            return ok("OK");
    }
    public Result buscarAmigos() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String name = json.findPath("name").textValue();
            if(name == null) {
                return badRequest("Digite un nombre para buscar");
            } else {
                ObjectNode dato1 = Json.newObject();
                dato1.put("id","100");
                dato1.put("name","Joel");
                ObjectNode dato2 = Json.newObject();
                dato2.put("id","200");
                dato2.put("name","Jose");
                ArrayNode amigos = Json.newArray();
                amigos.add(dato1);
                amigos.add(dato2);
                return ok(amigos);
            }
        }
    }
    public Result buscarUsuarios() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String name = json.findPath("name").textValue();
            if(name == null) {
                return badRequest("Digite un nombre para buscar");
            } else {
                ObjectNode dato1 = Json.newObject();
                dato1.put("id","100");
                dato1.put("name","Joel");
                ObjectNode dato2 = Json.newObject();
                dato2.put("id","200");
                dato2.put("name","Jose");
                ArrayNode amigos = Json.newArray();
                amigos.add(dato1);
                amigos.add(dato2);
                return ok(amigos);
            }
        }
    }
    public Result agregarAmigo() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String id = json.findPath("id").textValue();
            if(id == null) {
                return badRequest("no ha seleccionado un usuario para agregar");
            } else {
                return ok("OK");
            }
        }
    }
}
