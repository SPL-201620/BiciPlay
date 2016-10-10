package controllers.usuarios;

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
            String foto = json.findPath("foto").textValue();
            String name = json.findPath("name").textValue();
            String email = json.findPath("email").textValue();
            String password = json.findPath("password").textValue();

            if(name == null || email == null || password == null || foto==null) {
                return badRequest("Missing parameter");
            } else {
                Usuario usuario;
                if(json.findPath("id").asLong() == 0)
                    usuario = new Usuario();
                else
                    usuario=Usuario.find.byId(json.findPath("id").asLong());


                usuario.email =email;
                usuario.name = name;
                usuario.password = password;
                usuario.foto = foto;
                usuario.save();
                crearSession(usuario.id);

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
        if(usuario == null || !usuario.password.equals(password)){
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
        Usuario amigo = Usuario.find.where().eq("id", Integer.valueOf(usuarioId)).findUnique();
        return ok(GSON.toJson(amigo.misAmigos));
    }
    public Result buscarUsuarios() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            String name = json.findPath("name").textValue();
            if(name == null) {
                return badRequest("Digite un nombre o correo para buscar");
            } else {

                if(name.contains("@")){
                    Usuario usuario=Usuario.find.where().contains("email",name).findUnique();
                        return ok(GSON.toJson(usuario));
                    }
                else {
                    List<Usuario> usuarios=Usuario.find.where().contains("name",name).findList();
                    return ok(GSON.toJson(usuarios));
                }
            }
        }
    }
    public Result agregarAmigo() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest("Expecting Json data");
        } else {
            int id = json.findPath("id").asInt();
            if(id == 0) {
                return badRequest("no ha seleccionado un usuario para agregar");
            } else {
                Usuario amigo = Usuario.find.where().eq("id", id).findUnique();
                String usuarioId =  session(ID_USUARIO);
                Usuario usuario = Usuario.find.where().eq("id", Integer.valueOf(usuarioId)).findUnique();
                if (usuario.misAmigos.add(amigo)) {
                    usuario.save();
                    return ok("Ok");
                } else {

                    return ok("Error Agregando amigos");

                }
            }
        }
    }
}
