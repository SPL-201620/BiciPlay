package controllers.usuarios;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import models.Usuario;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import services.Counter;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

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
    private final static Gson GSON = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();

    private static final String PERSISTENCE_UNIT_NAME = "defaultPersistenceUnit";
    private static EntityManagerFactory factory;

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
                Usuario usuarioNuevo = new Usuario();
                usuarioNuevo.email =email;
                usuarioNuevo.name = name;
                usuarioNuevo.password = password;
                usuarioNuevo.save();
                crearSession(usuarioNuevo.id);
                Usuario usuario =  Usuario.find.byId((long)usuarioNuevo.id);
                return ok(GSON.toJson(usuario));
            }
        }
    }
    public Result login() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        }

        String email = json.findPath("username").textValue();
        String password = json.findPath("password").textValue();
        if(email == null || password == null) {
            return badRequest("Missing parameter");
        }

        Usuario usuario =  Usuario.find.where().eq("email", email).findUnique();
        if(usuario == null || usuario.password != password){
            return badRequest("Credenciales incorrectas");
        }

        crearSession(usuario.id);
        return ok(GSON.toJson(usuario));
    }
    private void crearSession(long idUsuario){
        session().clear();
        session(ID_USUARIO, "" + idUsuario);
        session(ROL_USUARIO, "admin");
    }

    public Result loggedin() {
        String idUsuario = session(ID_USUARIO);
        if (idUsuario==null) {
            return ok("null");
        }else {
            Usuario usuario =  Usuario.find.byId(Long.parseLong(idUsuario));
            return ok( GSON.toJson(usuario));
        }
    }
    public Result logout() {
        JsonNode json = request().body().asJson();
        session().clear();
        return ok("OK");
    }
    public Result darAmigos() {
        String usuarioId =  session(ID_USUARIO);
        //TODO ir a la base de datos y consultar los amigos de ese usuarioID
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
